import { ApiProperty } from '@nestjs/swagger';
import { status } from 'src/utils/constants/status';

export class CreatePackageDto {
  @ApiProperty({ example: 'Muslim1' })
  name: string;

  @ApiProperty({ example: '1' })
  category_id: number;

  @ApiProperty({ example: '1000' })
  price: number;

  @ApiProperty({ example: 'Muslim Wedding package 1' })
  description: string;

  @ApiProperty({
    example: '*base64 image*',
  })
  image: string;

  @ApiProperty({ example: status.active })
  status: string;
}
