import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'admin@gmail.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '111111' })
  @IsString()
  readonly password: string;
}
