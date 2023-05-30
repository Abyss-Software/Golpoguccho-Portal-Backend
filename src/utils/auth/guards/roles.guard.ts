import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../../users/users.service';

@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('user role guard');
    const roles = this.reflector.get<string>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    let result = false;
    const { user } = context.switchToHttp().getRequest();
    const [userInfo] = await this.usersService.findUserByEmail(user.email);
    console.log(roles, userInfo.role);
    result = roles.includes(userInfo.role);
    console.log(result);
    return result;
  }
}
