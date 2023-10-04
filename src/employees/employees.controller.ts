import {
  Body,
  Catch,
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
import { UpdateEarningsDto } from './dto/updateEarnings.dto';
import { UpdateEmployeeDto } from './dto/updateEmployee.dto';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { EmployeesService } from './employees.service';

@Catch()
@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin])
  @ApiBearerAuth()
  @Post('create-employee')
  async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return await this.employeesService.createEmployee(createEmployeeDto);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin])
  @ApiBearerAuth()
  @Get('')
  async getAllEmployees() {
    return await this.employeesService.getAllEmployees();
  }

  @ApiBearerAuth()
  @Get('/:id')
  async getEmployeeByUserId(@Param('id') id: string) {
    return await this.employeesService.getEmployeeByUserId(id);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin, role.moderator])
  @ApiBearerAuth()
  @Patch('/:id')
  async updateEmployeeById(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return await this.employeesService.updateEmployee(id, updateEmployeeDto);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.employee])
  @ApiBearerAuth()
  @Patch('/profile/:id')
  async updateProfile(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return await this.employeesService.updateProfile(id, updateProfileDto);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin])
  @ApiBearerAuth()
  @Patch('/salary/:id')
  async updateEarnings(
    @Param('id') id: string,
    @Body() updateEarningsDto: UpdateEarningsDto,
  ) {
    return await this.employeesService.updateEarnings(id, updateEarningsDto);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin])
  @ApiBearerAuth()
  @Delete('/:id')
  async deleteEmployeeById(@Param('id') id: string) {
    return await this.employeesService.deleteEmployeeById(id);
  }
}
