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
    const role = this.reflector.get<string>('roles', context.getHandler());
    if (!role) {
      return true;
    }
    let result = false;
    const { user } = context.switchToHttp().getRequest();
    const [userInfo] = await this.usersService.findUserByEmail(user.email);
    result = userInfo.role === role;
    return result;
  }
}
