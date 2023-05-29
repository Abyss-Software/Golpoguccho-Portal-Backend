import { Body, Controller, Post } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Packages')
@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post('create-category')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.packagesService.createCategory(createCategoryDto);
  }
}
