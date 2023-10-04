import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { FinanceService } from 'src/finance/finance.service';
import { EmailService } from 'src/mail/mail.service';
import { User } from 'src/users/users.entity';
import { CloudinaryUpload } from 'src/utils/image-upload/coudinary-upload';
import { errorhandler, successHandler } from 'src/utils/response.handler';
import { Not, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { UpdateEarningsDto } from './dto/updateEarnings.dto';
import { UpdateEmployeeDto } from './dto/updateEmployee.dto';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { Employee } from './employees.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
    private readonly financeService: FinanceService,
  ) {}

  async createEmployee(employeeInfo: CreateEmployeeDto) {
    const user = await this.authService.signUp(
      {
        name: employeeInfo.name,
        email: employeeInfo.email,
        password: employeeInfo.password,
      },
      employeeInfo.role,
    );

    const employee = this.employeeRepo.create({
      ...employeeInfo,
      user: user,
    });
    await this.employeeRepo.save(employee);

    return employee;
  }

  async getAllEmployees() {
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
  }

  async getEmployeeByUserId(id: string) {
    const employee = await this.employeeRepo.findOne({
      where: { user: { id: id } },
      relations: ['user'],
    });

    if (!employee) return errorhandler(404, 'Employee not found');

    const { password, ...user } = employee.user;

    return successHandler('Employee found', {
      ...employee,
      user: user,
    });
  }

  async updateEmployee(id: string, employeeInfo: UpdateEmployeeDto) {
    const employee = await this.employeeRepo.findOne({
      where: { id: id },
      relations: ['user'],
    });

    console.log(employee);

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
      address: employeeInfo.address,
      contactPrimary: employeeInfo.contactPrimary,
      contactSecondary: employeeInfo.contactSecondary,
      position: employeeInfo.position,
      verificationType: employeeInfo.verificationType,
      verificationId: employeeInfo.verificationId,
      baseSalary: employeeInfo.baseSalary,
      monthlySalary: employeeInfo.monthlySalary,
    });

    return successHandler('Employee updated', {
      ...updatedEmployee,
      user: updatedUser,
    });
  }

  async updateProfile(id: string, employeeInfo: UpdateProfileDto) {
    const employee = await this.employeeRepo.findOne({
      where: { id: id },
      relations: ['user'],
    });

    const emailExists = await this.userRepo.findOne({
      where: { email: employeeInfo.email, id: Not(employee.user.id) },
    });

    if (emailExists) return errorhandler(400, 'Email already exists');

    const updatedUser = await this.userRepo.update(employee.user.id, {
      name: employeeInfo.name,
      email: employeeInfo.email,
    });

    let secure_url = employee.avatar ? employee.avatar : null;

    if (employeeInfo.avatar) {
      const imageUpload = await CloudinaryUpload(
        employeeInfo.avatar,
        'categories',
        employeeInfo.name,
      );
      secure_url = imageUpload.secure_url;
    }

    const updatedEmployee = await this.employeeRepo.update(id, {
      address: employeeInfo.address,
      contactPrimary: employeeInfo.contactPrimary,
      contactSecondary: employeeInfo.contactSecondary,
      avatar: secure_url,
    });

    return successHandler('Profile updated', {
      ...updatedEmployee,
      user: updatedUser,
    });
  }

  async updateEarnings(id: string, updateEarningInfo: UpdateEarningsDto) {
    const employee = await this.employeeRepo.findOne({
      where: { id: id },
    });

    if (!employee) return errorhandler(404, 'Employee not found');

    console.log(employee, updateEarningInfo);
    const totalPaid = employee.paid + updateEarningInfo.amount;
    const updatedEmployee = await this.employeeRepo.update(id, {
      paid: totalPaid,
    });

    const salaryRecord = this.financeService.createFinanceRecord({
      title: updateEarningInfo.title,
      type: 'EXPENSE',
      transactionDate: updateEarningInfo.transactionDate,
      amount: updateEarningInfo.amount,
      category: 'Employee Salary',
      medium: updateEarningInfo.medium,
      trxId: updateEarningInfo.trxId,
    });

    console.log(salaryRecord);
    console.log(updatedEmployee);

    return successHandler('Profile updated', {
      updatedEmployee,
    });
  }

  async deleteEmployeeById(id: string) {
    const employee = await this.employeeRepo.findOne({
      where: { id: id },
      relations: ['user'],
    });
    if (!employee) return errorhandler(404, 'Employee not found');
    await this.employeeRepo.delete(id);
    await this.userRepo.delete(employee.user.id);
    return successHandler('Employee deleted', employee);
  }
}
