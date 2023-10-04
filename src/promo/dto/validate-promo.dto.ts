import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ValidatePromoDto {
  @ApiProperty({ example: 'discount10' })
  @IsString()
  promoCode: string;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  totalPayment: number;
}
