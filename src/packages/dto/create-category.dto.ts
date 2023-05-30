import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { status } from '../../utils/constants/status';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Muslim Wedding' })
  @IsString()
  name: string;

  @ApiProperty({
    example:
      'Wedding events like Holud, Reception and Boubhat for Muslim community',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAUAQMAAADWX60MAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAANQTFRFICEkL6uKCAAAAAxJREFUeJxjYKA9AAAAZAABhmQ8NQAAAABJRU5ErkJggg==',
  })
  @IsString()
  image: string;

  @ApiProperty({ example: status.active })
  @IsString()
  status: string;
}
