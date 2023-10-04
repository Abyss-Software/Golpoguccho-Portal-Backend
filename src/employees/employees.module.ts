import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FinanceModule } from 'src/finance/finance.module';
import { EmailService } from 'src/mail/mail.service';
import { User } from 'src/users/users.entity';
import { EmployeesController } from './employees.controller';
import { Employee } from './employees.entity';
import { EmployeesService } from './employees.service';

@Module({
  imports: [
    AuthModule,
    FinanceModule,
    TypeOrmModule.forFeature([Employee, User]),
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService, EmailService],
})
export class EmployeesModule {}
