import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const salt = await bcrypt.genSalt(10);
      const encPassword = await bcrypt.hash(createUserDto.password, salt);
      const user = this.userRepo.create({
        ...createUserDto,
        password: encPassword,
      });
      await this.userRepo.save(user);
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findUser(id: string) {
    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) return 'User not found';
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepo.findBy({ email: email });
    return user;
  }

  async findAllUsers() {
    return await this.userRepo.find();
  }

  async updateUser(id: string, attributes: Partial<User>) {
    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) throw new Error('User not found');
    Object.assign(user, attributes);
    return await this.userRepo.save(user);
  }

  async deleteUser(id: string) {
    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) throw new Error('User not found');
    return await this.userRepo.remove(user);
  }
}
