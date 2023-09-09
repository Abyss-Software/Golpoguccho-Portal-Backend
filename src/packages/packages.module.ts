import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Category } from './categories.entity';
import { PackagesController } from './packages.controller';
import { Package } from './packages.entity';
import { PackagesService } from './packages.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Category, Package])],
  providers: [PackagesService],
  controllers: [PackagesController],
  exports: [PackagesService],
})
export class PackagesModule {}
