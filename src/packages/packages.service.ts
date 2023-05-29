import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { Repository } from 'typeorm';
import { Package } from './packages.entity';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { cloudinaryConfig } from 'src/utils/configs/cloudinary.config';

const cloudinary = require('cloudinary').v2;

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Package)
    private readonly packageRepo: Repository<Package>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    cloudinary.config(cloudinaryConfig);
    const res = await cloudinary.uploader.upload(
      'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg',
      { public_id: 'olympic_flag' },
    );
    console.log(res);
    const category = this.categoryRepo.create({
      name: createCategoryDto.name,
      description: createCategoryDto.description,
      image: res.secure_url,
      status: 'active',
      created_at: new Date(),
    });
    await this.categoryRepo.save(category);
    return category;
  }
}
