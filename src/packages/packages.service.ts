import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { status } from 'src/utils/constants/status';
import { CloudinaryUpload } from 'src/utils/image-upload/coudinary-upload';
import { errorhandler, successHandler } from 'src/utils/response.handler';
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

    await this.categoryRepo.save(category);
    return successHandler('Category created successfully', category);
  }

  async createPackage(createPackageDto: CreatePackageDto) {
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
  }

  async getAllCategories() {
    const categories = await this.categoryRepo.find({
      relations: ['packages'],
    });

    return successHandler('Categories fetched successfully', categories);
  }

  async getAllPackages() {
    const packages = await this.packageRepo.find();
    return successHandler('Packages fetched successfully', packages);
  }

  async getCategoryById(id: string) {
    const categoryData = await this.categoryRepo.findOne({
      where: { id: id },
      relations: ['packages'],
    });
    if (!categoryData) return errorhandler(404, 'Category not found');
    return successHandler('Category fetched successfully', categoryData);
  }

  async getPackageById(id: string) {
    const packageData = await this.packageRepo.findOneBy({ id: id });
    if (!packageData) return errorhandler(404, 'Category not found');
    return successHandler('Package fetched successfully', packageData);
  }

  async updateCategory(id: string, attributes: UpdateCategoryDto) {
    const categoryData = await this.categoryRepo.findOneBy({ id: id });
    if (!categoryData) return errorhandler(404, 'Category not found');

    Object.assign(categoryData, attributes);
    await this.categoryRepo.save(categoryData);
    return successHandler('Category updated successfully', categoryData);
  }

  async updatePackage(id: string, attributes: Partial<UpdatePackageDto>) {
    const packageData = await this.packageRepo.findOneBy({ id: id });
    if (!packageData) return errorhandler(404, 'Package not found');

    Object.assign(packageData, attributes);
    await this.packageRepo.save(packageData);
    return successHandler('Package updated successfully', packageData);
  }

  async deleteCategory(id: string) {
    const categoryData = await this.categoryRepo.findOneBy({ id: id });
    if (!categoryData) return errorhandler(404, 'Category not found');

    const del = await this.categoryRepo.remove(categoryData);

    return successHandler('Category deleted successfully', {});
  }

  async deletePackage(id: string) {
    const packageData = await this.packageRepo.findOneBy({ id: id });
    if (!packageData) return errorhandler(404, 'Package not found');

    await this.packageRepo.delete(packageData);
    return successHandler('Package deleted successfully', {});
  }
}
