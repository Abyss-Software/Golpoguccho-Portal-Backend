import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class StatsBetweenDto {
  @ApiProperty({ example: '' })
  @IsString()
  start: string;

  @ApiProperty({ example: '' })
  @IsString()
  end: string;
}
