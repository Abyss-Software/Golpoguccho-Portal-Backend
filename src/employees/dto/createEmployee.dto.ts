import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { role } from 'src/utils/constants/role';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'John son' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'employee@gmail.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: '111111' })
  @IsString()
  password: string;

  @ApiProperty({ example: role.employee })
  @IsString()
  role: string;

  @ApiProperty({ example: 'Photographer' })
  @IsString()
  position: string;

  @ApiProperty({ example: '01717177777' })
  @IsString()
  contactPrimary: string;

  @ApiProperty({ example: 'Photographer' })
  @IsString()
  contactSecondary: string;

  @ApiProperty({ example: 'Mirpur, Dhaka' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'NID' })
  @IsString()
  verificationType: string;

  @ApiProperty({ example: '111111111111' })
  @IsString()
  verificationId: string;

  @ApiProperty({ example: '10000' })
  @IsNumber()
  @IsOptional()
  baseSalary?: number;

  @ApiProperty({ example: '10000' })
  @IsNumber()
  @IsOptional()
  monthlySalary?: number;
}
