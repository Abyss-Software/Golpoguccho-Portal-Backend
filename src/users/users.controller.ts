import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @Post('/create')
  // createUser(@Body() body: CreateUserDto) {
  //   return this.usersService.createUser(body);
  // }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findUser(parseInt(id));
  }

  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() attributes: UpdateUserDto) {
    return this.usersService.updateUser(parseInt(id), attributes);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(parseInt(id));
  }
}
