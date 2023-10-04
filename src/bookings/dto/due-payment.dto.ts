import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DuePaymentDto {
  @ApiProperty({
    example: '',
  })
  @IsString()
  bookingId: string;

  @ApiProperty({
    example: 'bkash',
  })
  @IsString()
  duePaymentMethod: string;

  @ApiProperty({
    example: '1232133',
  })
  @IsString()
  dueTransactionId: string;
}

// @ApiProperty({
//   example: 'CONFIRMED',
// })
// @IsString()
// status: string;
