import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePackageDto {
  @ApiProperty({ example: 'Muslim1' })
  @IsString()
  title: string;

  @ApiProperty({ example: '1' })
  @IsString()
  categoryId: string;

  @ApiProperty({ example: '1000' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'Muslim Wedding package 1' })
  @IsString()
  description: string;

  @ApiProperty({
    example:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAUAQMAAADWX60MAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAANQTFRFICEkL6uKCAAAAAxJREFUeJxjYKA9AAAAZAABhmQ8NQAAAABJRU5ErkJggg==',
  })
  @IsString()
  image: string;
}
