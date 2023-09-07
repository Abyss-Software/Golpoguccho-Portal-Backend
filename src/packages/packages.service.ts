import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { status } from 'src/utils/constants/status';
import { CloudinaryUpload } from 'src/utils/image-upload/coudinary-upload';
import {
  errorhandler,
  notfound,
  successHandler,
} from 'src/utils/response.handler';
import { Repository } from 'typeorm';
import { Category } from './categories.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package } from './packages.entity';
@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Package)
    private readonly packageRepo: Repository<Package>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const existingCategory = await this.categoryRepo.findOneBy({
        title: createCategoryDto.title,
      });
      if (existingCategory)
        return errorhandler(400, 'Category with this name already exists');

      const imageUpload = await CloudinaryUpload(
        createCategoryDto.image,
        'categories',
        createCategoryDto.title,
      );

      const category = this.categoryRepo.create({
        ...createCategoryDto,
        image: imageUpload.secure_url,
        status: status.active,
      });
      console.log(category);

      await this.categoryRepo.save(category);
      return successHandler('Category created successfully', category);
    } catch (error) {
      return errorhandler(error.status, error.message);
    }
  }

  async createPackage(createPackageDto: CreatePackageDto) {
    try {
      const existingPackage = await this.packageRepo.findOneBy({
        title: createPackageDto.title,
      });
      if (existingPackage)
        return errorhandler(400, 'Package with this name already exists');

      const imageUpload = await CloudinaryUpload(
        createPackageDto.image,
        'packages',
        createPackageDto.title,
      );
      const category = await this.categoryRepo.findOneBy({
        id: createPackageDto.categoryId,
      });
      const packageData = this.packageRepo.create({
        ...createPackageDto,
        image: imageUpload.secure_url,
        category: category,
        status: status.active,
      });
      await this.packageRepo.save(packageData);

      return successHandler('Package created successfully', packageData);
    } catch (error) {
      return errorhandler(error.status, error.message);
    }
  }

  async getAllCategories() {
    try {
      const categories = await this.categoryRepo.find({
        relations: ['packages'],
      });
      console.log(categories);
      return successHandler('Categories fetched successfully', categories);
    } catch (error) {
      return errorhandler(error.status, error.message);
    }
  }

  async getAllPackages() {
    try {
      const packages = await this.packageRepo.find();
      return successHandler('Packages fetched successfully', packages);
    } catch (error) {
      return errorhandler(error.status, error.message);
    }
  }

  async getCategoryById(id: string) {
    try {
      const categoryData = await this.categoryRepo.findOne({
        where: { id: id },
        relations: ['packages'],
      });
      if (!categoryData) return notfound('Category not found');
      return successHandler('Category fetched successfully', categoryData);
    } catch (error) {
      return errorhandler(error.status, error.message);
    }
  }

  async getPackageById(id: string) {
    try {
      const packageData = await this.packageRepo.findOneBy({ id: id });
      if (!packageData) return notfound('Category not found');
      return successHandler('Package fetched successfully', packageData);
    } catch (error) {
      return errorhandler(error.status, error.message);
    }
  }

  async updateCategory(id: string, attributes: UpdateCategoryDto) {
    try {
      const categoryData = await this.categoryRepo.findOneBy({ id: id });
      if (!categoryData) return notfound('Category not found');

      Object.assign(categoryData, attributes);
      await this.categoryRepo.save(categoryData);
      return successHandler('Category updated successfully', categoryData);
    } catch (error) {
      return errorhandler(error.status, error.message);
    }
  }

  async updatePackage(id: string, attributes: Partial<UpdatePackageDto>) {
    try {
      const packageData = await this.packageRepo.findOneBy({ id: id });
      if (!packageData) return notfound('Package not found');

      Object.assign(packageData, attributes);
      await this.packageRepo.save(packageData);
      return successHandler('Package updated successfully', packageData);
    } catch (error) {
      return errorhandler(error.status, error.message);
    }
  }

  async deleteCategory(id: string) {
    try {
      const categoryData = await this.categoryRepo.findOneBy({ id: id });
      if (!categoryData) return notfound('Category not found');
      console.log(categoryData);
      const del = await this.categoryRepo.remove(categoryData);
      console.log('del', del);
      return successHandler('Category deleted successfully', {});
    } catch (error) {
      return errorhandler(error.status, error.message);
    }
  }

  async deletePackage(id: string) {
    try {
      const packageData = await this.packageRepo.findOneBy({ id: id });
      if (!packageData) return notfound('Package not found');

      await this.packageRepo.delete(packageData);
      return successHandler('Package deleted successfully', {});
    } catch (error) {
      return errorhandler(error.status, error.message);
    }
  }
}
