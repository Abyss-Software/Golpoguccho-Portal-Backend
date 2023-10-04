import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { successHandler } from 'src/utils/response.handler';
import { Between, Repository } from 'typeorm';
import { CreateRecordDto } from './dto/create-record.dto';
import { FinancialRecord } from './finance.entity';

@Injectable()
export class FinanceService {
  constructor(
    @InjectRepository(FinancialRecord)
    private readonly financeRepo: Repository<FinancialRecord>,
  ) {}

  async getAllRecords() {
    const records = await this.financeRepo.find();
    return successHandler('All Records', records);
  }

  async createFinanceRecord(createRecordDto: CreateRecordDto) {
    const record = this.financeRepo.create({
      ...createRecordDto,
    });
    await this.financeRepo.save(record);
    return successHandler('Record created successfully', record);
  }

  async getRecordsBetween(recordsBetween: any) {
    const startDate = new Date(recordsBetween.start);
    const endDate = new Date(recordsBetween.end);

    console.log(startDate, endDate);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error(
        'Invalid date format. Please provide valid date strings.',
      );
    }

    const records = await this.financeRepo.find({
      where: {
        transactionDate: Between(startDate, endDate),
      },
    });
    console.log(records);
    return successHandler('Records between', records);
  }

  async deleteRecord(recordId: string) {
    await this.financeRepo.delete(recordId);
    return successHandler('Record deleted successfully', 'deleted');
  }
}
