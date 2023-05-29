import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { Package } from './packages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Package])],
  providers: [PackagesService],
  controllers: [PackagesController],
})
export class PackagesModule {}