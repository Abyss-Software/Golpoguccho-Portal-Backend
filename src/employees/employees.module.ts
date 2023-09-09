import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/users.entity';
import { EmployeesController } from './employees.controller';
import { Employee } from './employees.entity';
import { EmployeesService } from './employees.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Employee, User])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
