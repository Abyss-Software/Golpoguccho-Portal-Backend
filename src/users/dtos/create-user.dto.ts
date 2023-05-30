import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  readonly password: string;

  @ApiProperty({ example: 'admin' })
  @IsString()
  readonly role: string;

  @ApiProperty({ example: 'Dhaka' })
  @IsString()
  readonly address: string;

  @ApiProperty({ example: '01700000000' })
  @IsString()
  readonly phone_primary: string;

  @ApiProperty({ example: '01700000001' })
  @IsString()
  readonly phone_secondary: string;

  @ApiProperty({ example: 'Photographer' })
  @IsString()
  readonly position: string;

  @ApiProperty({ example: 'NID' })
  @IsString()
  readonly verification_type: string;

  @ApiProperty({ example: '12345678901234567' })
  @IsString()
  readonly verification_id: string;

  @ApiProperty({ example: 5000 })
  @IsNumber()
  readonly base_salary: number;

  @ApiProperty({ example: 10000 })
  @IsNumber()
  readonly monthly_salary: number;

  @ApiProperty({ example: 'active' })
  @IsString()
  readonly status: string;
}
