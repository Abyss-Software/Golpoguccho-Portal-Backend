import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SocialLoginDto {
  @ApiProperty({ example: 'client@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'client' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'client' })
  @IsString()
  lastName: string;
}
