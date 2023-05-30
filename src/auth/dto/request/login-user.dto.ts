import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  readonly password: string;
}
