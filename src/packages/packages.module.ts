import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { Package } from './packages.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/utils/auth/strategy/jwt.strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Category, Package])],
  providers: [PackagesService],
  controllers: [PackagesController],
})
export class PackagesModule {}
