import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignUpResponseDto } from './dto/response/signup-response.dto';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/request/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/utils/constants/jwt';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginResponseDto } from './dto/response/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getTokens(userId: number, email: string, role: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email, role },
        { secret: jwtConstants.secret, expiresIn: jwtConstants.expires_in },
      ),
      this.jwtService.signAsync(
        { sub: userId, email, role },
        {
          secret: jwtConstants.REFRESH_TOKEN_SECRET,
          expiresIn: jwtConstants.REFRESH_TOKEN_EXPIRATION,
        },
      ),
    ]);

    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }

  async signUp(signupUserDto: CreateUserDto) {
    const user = await this.usersService.findUserByEmail(signupUserDto.email);
    if (user.length) {
      throw new BadRequestException('User with this email already exists');
    }
    const newUser: User = await this.usersService.createUser(signupUserDto);
    const responseDto: SignUpResponseDto = {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      address: newUser.address,
      phone_primary: newUser.phone_primary,
      position: newUser.position,
      verification_type: newUser.verification_type,
      verification_id: newUser.verification_id,
      base_salary: newUser.base_salary,
      monthly_salary: newUser.monthly_salary,
      created_at: newUser.created_at,
    };

    console.log(responseDto);
    return responseDto;
  }

  async login(loginInfo: LoginUserDto) {
    const [userInfo] = await this.usersService.findUserByEmail(loginInfo.email);
    if (!userInfo) {
      throw new NotFoundException('User with this email does not exist');
    }
    const isPasswordValid = await bcrypt.compare(
      loginInfo.password,
      userInfo.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }
    const tokens = await this.getTokens(
      userInfo.id,
      userInfo.email,
      userInfo.role,
    );
    console.warn('dsfakj', userInfo);

    const loginResponse: LoginResponseDto = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      user: {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        role: userInfo.role,
      },
    };
    console.log('login res ', loginResponse);
    return loginResponse;
  }

  async refreshTokens(res: any, req: any, token: string) {
    try {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      const decodedJwtRefreshToken: any = this.jwtService.decode(token);
      if (!decodedJwtRefreshToken) {
        throw new ForbiddenException('Access Denied');
      }
      const expires = decodedJwtRefreshToken.exp;
      if (expires < new Date().getTime() / 1000) {
        throw new ForbiddenException('Access Denied');
      }
      const userInfo = await this.userRepo.findOneBy({
        id: decodedJwtRefreshToken.sub,
      });
      if (!userInfo) {
        throw new ForbiddenException('Access Denied');
      }

      const tokens = await this.getTokens(
        userInfo.id,
        userInfo.email,
        userInfo.role,
      );
      const loginResponse: LoginResponseDto = {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        user: {
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          role: userInfo.role,
        },
      };
      return loginResponse;
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  async logout(req: any, res: any) {
    try {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.clearCookie('refreshToken', {
        sameSite: 'none',
        httpOnly: true,
        secure: true,
        path: '/auth/refresh-token',
      });
      return 'Logged out!';
    } catch (err) {
      return new BadRequestException(err);
    }
  }
}
