import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async createUser(body: CreateUserDto) {
    const user = this.userRepo.create(body);
    await this.userRepo.save(user);
    console.log(user);
    return user;
  }

  async findUser(id: number) {
    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) return 'User not found';
    return user;
  }

  async findAllUsers() {
    return await this.userRepo.find();
  }

  async updateUser(id: number, attributes: Partial<User>) {
    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) throw new Error('User not found');
    Object.assign(user, attributes);
    return await this.userRepo.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) throw new Error('User not found');
    return await this.userRepo.remove(user);
  }
}
