import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class SignUpResponseDto {
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'example@gmail.com' })
  email: string;

  @ApiProperty({ example: 'admin' })
  role: string;

  @ApiProperty({ example: 'Dhaka' })
  address: string;

  @ApiProperty({ example: '01700000000' })
  phone_primary: string;

  @ApiProperty({ example: 'Photographer' })
  position: string;

  @ApiProperty({ example: 'NID' })
  verification_type: string;

  @ApiProperty({ example: '12345678901234567' })
  verification_id: string;

  @ApiProperty({ example: 5000 })
  base_salary: number;

  @ApiProperty({ example: 10000 })
  monthly_salary: number;

  @ApiProperty({ example: '2023-05-28T12:34:56Z' })
  created_at: Date;
}
