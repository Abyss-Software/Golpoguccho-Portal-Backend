import {
  Body,
  Catch,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/auth/guards/jwt-auth.guard';
import { UserRolesGuard } from 'src/utils/auth/guards/roles.guard';
import { role } from 'src/utils/constants/role';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PackagesService } from './packages.service';

@Catch()
@ApiTags('Packages')
@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin, role.manager])
  @ApiBearerAuth()
  @Post('create-category')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.packagesService.createCategory(createCategoryDto);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin, role.manager])
  @ApiBearerAuth()
  @Post('create-package')
  async createPackage(@Body() createPackageDto: CreatePackageDto) {
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
  async getCategoryById(@Param('id') id: string) {
    return await this.packagesService.getCategoryById(id);
  }

  @Get('/:id')
  async getPackageById(@Param('id') id: string) {
    return await this.packagesService.getPackageById(id);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin, role.manager])
  @ApiBearerAuth()
  @Patch('category/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.packagesService.updateCategory(id, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin, role.manager])
  @ApiBearerAuth()
  @Patch('/:id')
  async updatePackage(
    @Param('id') id: string,
    @Body() updatePackageDto: UpdatePackageDto,
  ) {
    return await this.packagesService.updatePackage(id, updatePackageDto);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin, role.manager])
  @ApiBearerAuth()
  @Delete('category/:id')
  async deleteCategory(@Param('id') id: string) {
    return await this.packagesService.deleteCategory(id);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin, role.manager])
  @ApiBearerAuth()
  @Delete('/:id')
  async deletePackage(@Param('id') id: string) {
    return await this.packagesService.deletePackage(id);
  }
}
