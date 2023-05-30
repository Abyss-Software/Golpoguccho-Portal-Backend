import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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
      'https://res.cloudinary.com/dxkufsejm/image/upload/v1627668236/olympic_flag.jpg',
  })
  @IsString()
  image: string;

  @ApiProperty({ example: 'active' })
  @IsString()
  status: string;
}
