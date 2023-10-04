import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateEventDto } from 'src/events/dto/create-event.dto';

export class CreateBookingDto {
  @ApiProperty({
    example: '478b8910-ae1b-4336-999c-251aacd3a2da',
  })
  @IsString()
  clientId: string;

  @ApiProperty({ example: 'Siams Wedding events' })
  @IsString()
  bookingTitle: string;

  @ApiProperty({
    example: 'Siam Ahmed',
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    example: 'email@gmail.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: '+880 1711-111111',
  })
  @IsString()
  contactPrimary: string;

  @ApiProperty({
    example: '+880 1711-222222',
  })
  @IsString()
  @IsOptional()
  contactSecondary: string;

  @ApiProperty({
    example: 'Dhaka, Bangladesh',
  })
  @IsString()
  address: string;

  @ApiProperty({
    example: 'Dhaka',
  })
  @IsString()
  city: string;

  @ApiProperty({ nullable: true })
  @IsArray()
  events?: CreateEventDto[];

  @ApiProperty({
    example: '',
  })
  @IsString()
  @IsOptional()
  promoCode?: string;

  @ApiProperty({
    example: 1000,
  })
  @IsNumber()
  totalPayment: number;

  @ApiProperty({
    example: 500,
  })
  @IsNumber()
  advancePayment: number;

  @ApiProperty({ example: 'bKash' })
  @IsString()
  advancePaymentMethod: string;

  @ApiProperty({ example: '111111111' })
  @IsString()
  advanceTransactionId: string;

  @ApiProperty({
    example: 500,
  })
  @IsNumber()
  duePayment: number;

  // @ApiProperty({
  //   example: 'true',
  // })
  // @IsBoolean()
  // physicalCopy: boolean;

  // @ApiProperty({
  //   example: 'pending',
  // })
  // @IsString()
  // status: string;

  // @ApiProperty({
  //   example: 'additionalInfo',
  // })
  // @IsString()
  // additionalInfo: string;
}
