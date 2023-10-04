import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CalculatePaymentDto {
  @ApiProperty({
    example: [
      '44dfd798-ee7a-4639-b275-f0dd08294cd9',
      'afbc55e7-65a0-497e-b3fe-d8bcb43ff705',
    ],
  })
  @IsString({ each: true })
  packageIds: string[];

  @ApiProperty({ example: 'discount10' })
  @IsString()
  @IsOptional()
  promoCode: string;
}
