import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEarningsDto {
  @ApiProperty({ example: 'Salary: employee-name-september' })
  @IsString()
  title: string;

  @ApiProperty({ example: 10000 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: '2021-05-20' })
  @IsString()
  transactionDate: Date;

  @ApiProperty({ example: 'Cash' })
  @IsString()
  medium: string;

  @ApiProperty({ example: '01717177777' })
  @IsString()
  @IsOptional()
  trxId?: string;
}
