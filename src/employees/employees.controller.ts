import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/auth/guards/jwt-auth.guard';
import { UserRolesGuard } from 'src/utils/auth/guards/roles.guard';
import { role } from 'src/utils/constants/role';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { UpdateEmployeeDto } from './dto/updateEmployee.dto';
import { EmployeesService } from './employees.service';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin])
  @ApiBearerAuth()
  @Post('create-employee')
  async createPackage(@Body() createEmployeeDto: CreateEmployeeDto) {
    return await this.employeesService.createEmployee(createEmployeeDto);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin])
  @ApiBearerAuth()
  @Get('')
  async getAllEmployees() {
    return await this.employeesService.getAllEmployees();
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin])
  @ApiBearerAuth()
  @Get('/:id')
  async getEmployeeById(@Param('id') id: string) {
    console.log(id);
    return await this.employeesService.getEmployeeById(id);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin, role.employee])
  @ApiBearerAuth()
  @Patch('/:id')
  async updateEmployeeById(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return await this.employeesService.updateEmployee(id, updateEmployeeDto);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin])
  @ApiBearerAuth()
  @Delete('/:id')
  async deleteEmployeeById(@Param('id') id: string) {
    return await this.employeesService.deleteEmployeeById(id);
  }
}
