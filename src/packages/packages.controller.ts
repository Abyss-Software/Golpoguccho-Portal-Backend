import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PackagesService } from './packages.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdatePackageDto } from './dto/update-package.dto';

@ApiTags('Packages')
@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post('create-category')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.packagesService.createCategory(createCategoryDto);
  }

  @Post('create-package')
  async createPackage(@Body() createPackageDto: CreatePackageDto) {
    console.log(createPackageDto);
    return await this.packagesService.createPackage(createPackageDto);
  }

  @Get('categories')
  async getCategories() {
    return await this.packagesService.getAllCategories();
  }

  @Get()
  async getPackages() {
    return await this.packagesService.getAllPackages();
  }

  @Get('categories/:id')
  async getCategoryById(@Param('id') id: number) {
    return await this.packagesService.getCategoryById(id);
  }

  @Get('/:id')
  async getPackageById(@Param('id') id: string) {
    return await this.packagesService.getPackageById(parseInt(id));
  }

  @Patch('category/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.packagesService.updateCategory(
      parseInt(id),
      updateCategoryDto,
    );
  }

  @Patch('/:id')
  async updatePackage(
    @Param('id') id: string,
    @Body() updatePackageDto: UpdatePackageDto,
  ) {
    return await this.packagesService.updatePackage(
      parseInt(id),
      updatePackageDto,
    );
  }

  @Delete('category/:id')
  async deleteCategory(@Param('id') id: string) {
    return await this.packagesService.deleteCategory(parseInt(id));
  }

  @Delete('/:id')
  async deletePackage(@Param('id') id: string) {
    return await this.packagesService.deletePackage(parseInt(id));
  }
}
