import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { Repository } from 'typeorm';
import { Package } from './packages.entity';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { CreatePackageDto } from './dto/request/create-package.dto';
import { CloudinaryUpload } from 'src/utils/image-upload/coudinary-upload';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Package)
    private readonly packageRepo: Repository<Package>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const imageUpload = await CloudinaryUpload(
      createCategoryDto.image,
      'categories',
      createCategoryDto.name,
    );
    const category = this.categoryRepo.create({
      ...createCategoryDto,
      image: imageUpload.secure_url,
      created_at: new Date(),
    });
    await this.categoryRepo.save(category);
    return category;
  }

  async createPackage(createPackageDto: CreatePackageDto) {}
}
