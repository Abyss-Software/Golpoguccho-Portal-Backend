import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/request/login-user.dto';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { JwtAuthGuard } from 'src/utils/auth/guards/jwt-auth.guard';
import { UserRolesGuard } from 'src/utils/auth/guards/roles.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', ['admin'])
  @ApiBearerAuth()
  @Post('/signup')
  async signUp(@Body() signUpUserDto: CreateUserDto) {
    return await this.authService.signUp(signUpUserDto);
  }

  @Post('/login')
  async login(
    @Request() req,
    @Body() loginInfo: LoginUserDto,
    @Response({ passthrough: true }) res,
  ) {
    const userInfo = await this.authService.login(loginInfo);

    res.cookie('refreshToken', userInfo.refresh_token, {
      expires: new Date(new Date().setDate(new Date().getDate() + 7)),
      sameSite: 'none',
      httpOnly: true,
      secure: false,
    });
    res.header('Access-Control-Allow-Origin', req.headers.origin);

    return userInfo;
  }

  @Get('/refresh')
  async refreshTokens(@Request() req, @Response({ passthrough: true }) res) {
    return await this.authService.refreshTokens(
      res,
      req,
      req.cookies.refreshToken,
    );
  }

  @Get('/logout')
  async logout(@Request() req, @Response({ passthrough: true }) res) {
    return await this.authService.logout(req, res);
  }
}
