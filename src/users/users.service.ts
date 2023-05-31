import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import {
  errorhandler,
  notfound,
  successHandler,
} from 'src/utils/response.handler';

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
    try {
      const user = await this.userRepo.findOneBy({ id: id });
      if (!user) return notfound('User not found');
      const { password, ...response } = user;
      return successHandler('User found', response);
    } catch (error) {
      return errorhandler(500, error.message);
    }
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepo.findBy({ email: email });
    return user;
  }

  async findAllUsers() {
    try {
      const users = await this.userRepo.find();
      if (!users.length) return notfound('No users found');
      const usersWithoutPassword = [];
      users.map((user) => {
        const { password, ...userWithoutPassword } = user;
        usersWithoutPassword.push(userWithoutPassword);
      });
      return successHandler('Users found', usersWithoutPassword);
    } catch (error) {
      return errorhandler(500, error.message);
    }
  }

  async updateUser(id: string, attributes: Partial<User>) {
    try {
      const user = await this.userRepo.findOneBy({ id: id });
      if (!user) return notfound('User not found');
      Object.assign(user, attributes);
      const updatedUser = await this.userRepo.save(user);
      const { password, ...response } = updatedUser;
      return successHandler('User updated successfully', response);
    } catch (error) {
      return errorhandler(500, error.message);
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await this.userRepo.findOneBy({ id: id });
      if (!user) throw new Error('User not found');
      await this.userRepo.remove(user);
      return successHandler('User deleted successfully', null);
    } catch (error) {
      return errorhandler(500, error.message);
    }
  }
}
