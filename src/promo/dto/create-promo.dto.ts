import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePromoDto {
  @ApiProperty({ example: 'discount10' })
  @IsString()
  promoCode: string;

  @ApiProperty({ example: 'discount for Launching' })
  @IsString()
  description: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  discountPercentage: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  maxUse: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  maxDiscount: number;

  @ApiProperty({ example: '2025-10-10' })
  @IsString()
  expiryDate: string;

  @ApiProperty({ example: 'active' })
  @IsString()
  status: string;
}
