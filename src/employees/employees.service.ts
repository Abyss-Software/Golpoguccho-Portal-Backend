import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/users/users.entity';
import { role } from 'src/utils/constants/role';
import { errorhandler, successHandler } from 'src/utils/response.handler';
import { Not, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { UpdateEmployeeDto } from './dto/updateEmployee.dto';
import { Employee } from './employees.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async createEmployee(employeeInfo: CreateEmployeeDto) {
    try {
      const user = await this.authService.signUp(
        {
          name: employeeInfo.name,
          email: employeeInfo.email,
          password: employeeInfo.password,
        },
        role.employee,
      );

      const employee = this.employeeRepo.create({
        ...employeeInfo,
        user: user,
      });
      await this.employeeRepo.save(employee);
      return employee;
    } catch (error) {
      return error;
    }
  }

  async getAllEmployees() {
    try {
      const employees = await this.employeeRepo.find({
        relations: ['user'],
      });

      const employeesWithoutPassword = [];
      employees.map((employee: Employee) => {
        const { password, ...userWithoutPassword } = employee.user;
        employeesWithoutPassword.push({
          ...employee,
          user: userWithoutPassword,
        });
      });
      return successHandler('Employees found', employeesWithoutPassword);
    } catch (error) {
      return error;
    }
  }

  async getEmployeeById(id: string) {
    try {
      const employee = await this.employeeRepo.findOne({
        where: { id: id },
        relations: ['user'],
      });

      if (!employee) return errorhandler(404, 'Employee not found');

      const { password, ...user } = employee.user;

      return successHandler('Employee found', {
        ...employee,
        user: user,
      });
    } catch (error) {
      return error;
    }
  }

  async updateEmployee(id: string, employeeInfo: UpdateEmployeeDto) {
    try {
      const employee = await this.employeeRepo.findOne({
        where: { id: id },
        relations: ['user'],
      });

      if (!employee) return errorhandler(404, 'Employee not found');

      const emailExists = await this.userRepo.findOne({
        where: { email: employeeInfo.email, id: Not(employee.user.id) },
      });

      if (emailExists) return errorhandler(400, 'Email already exists');

      const updatedUser = await this.userRepo.update(employee.user.id, {
        name: employeeInfo.name,
        email: employeeInfo.email,
        role: employeeInfo.role,
      });

      const updatedEmployee = await this.employeeRepo.update(id, {
        ...employeeInfo,
      });

      return successHandler('Employee updated', {
        ...updatedEmployee,
        user: updatedUser,
      });
    } catch (error) {
      return error;
    }
  }

  async deleteEmployeeById(id: string) {
    try {
      const employee = await this.employeeRepo.findOne({
        where: { id: id },
        relations: ['user'],
      });
      if (!employee) return errorhandler(404, 'Employee not found');
      await this.employeeRepo.delete(id);
      await this.userRepo.delete(employee.user.id);
      return successHandler('Employee deleted', employee);
    } catch (error) {
      return error;
    }
  }
}
