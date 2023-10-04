import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRecordDto {
  @ApiProperty({ example: 'Random booking advance payment' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Advance Payment' })
  @IsString()
  type: string;

  @ApiProperty({ example: '' })
  @IsDateString()
  transactionDate: Date;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'Booking' })
  @IsString()
  category: string;

  @ApiProperty({ example: 'Cash' })
  @IsString()
  medium?: string;

  @ApiProperty({ example: '123ABC' })
  @IsString()
  @IsOptional()
  trxId?: string;
}
