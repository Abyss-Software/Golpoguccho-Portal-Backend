import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({ example: 'John son' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'employee@gmail.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: '01717177777' })
  @IsString()
  contactPrimary: string;

  @ApiProperty({ example: 'Photographer' })
  @IsString()
  @IsOptional()
  contactSecondary: string;

  @ApiProperty({ example: 'Mirpur, Dhaka' })
  @IsString()
  address: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsOptional()
  avatar: string;
}
