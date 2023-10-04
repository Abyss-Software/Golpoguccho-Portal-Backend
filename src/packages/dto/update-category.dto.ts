import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { status } from '../../utils/constants/status';

export class UpdateCategoryDto {
  @ApiProperty({ example: 'Muslim Wedding' })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    example:
      'Wedding events like Holud, Reception and Boubhat for Muslim community',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    example:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAUAQMAAADWX60MAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAANQTFRFICEkL6uKCAAAAAxJREFUeJxjYKA9AAAAZAABhmQ8NQAAAABJRU5ErkJggg==',
  })
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty({ example: status.active })
  @IsString()
  @IsOptional()
  status: string;
}
