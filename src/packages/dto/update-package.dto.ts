import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { status } from 'src/utils/constants/status';

export class UpdatePackageDto {
  @ApiProperty({ example: 'Muslim1' })
  @IsOptional()
  name: string;

  @ApiProperty({ example: '1000' })
  @IsOptional()
  price: number;

  @ApiProperty({ example: 'Muslim Wedding package 1' })
  @IsOptional()
  description: string;

  @ApiProperty({
    example: '*base64 image*',
  })
  @IsOptional()
  image: string;

  @ApiProperty({ example: status.active })
  @IsOptional()
  status: string;
}
