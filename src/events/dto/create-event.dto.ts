import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({
    example: 'a724a19e-1c18-4b4c-bfa6-ef64558a0415',
  })
  @IsString()
  categoryId: string;

  @ApiProperty({
    example: 'afbc55e7-65a0-497e-b3fe-d8bcb43ff705',
  })
  @IsString()
  packageId: string;

  @ApiProperty({ example: 'Siams Wedding' })
  @IsString()
  eventTitle: string;

  @ApiProperty({ example: '2021-05-20' })
  @IsString()
  eventDate: Date;

  @ApiProperty({ example: '10:50 AM' })
  @IsString()
  eventTime: string;

  @ApiProperty({ example: '12:00 PM' })
  @IsString()
  eventEndTime: string;

  @ApiProperty({ example: 'Shenakunja' })
  @IsString()
  eventVenue: string;

  @ApiProperty({ example: 'Dhaka' })
  @IsString()
  eventVenueAddress: string;

  @ApiProperty({ example: '100' })
  @IsString()
  numberOfGuests: number;

  @ApiProperty({ example: 'day' })
  @IsString()
  dayOrEvening: string;

  @ApiProperty({ example: 'inside' })
  @IsString()
  dhakaOrOutside: string;

  @ApiProperty({ example: 'Additional information' })
  @IsString()
  @IsOptional()
  additionalInfo: string;
}
