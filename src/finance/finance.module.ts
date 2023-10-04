import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanceController } from './finance.controller';
import { FinancialRecord } from './finance.entity';
import { FinanceService } from './finance.service';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialRecord])],
  providers: [FinanceService],
  controllers: [FinanceController],
  exports: [FinanceService],
})
export class FinanceModule {}
