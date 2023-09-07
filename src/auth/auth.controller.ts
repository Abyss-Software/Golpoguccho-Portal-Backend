import { Body, Controller, Get, Post, Request, Response } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { SocialLoginDto } from './dto/social-login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signUpUserDto: SignUpUserDto) {
    return await this.authService.signUp(signUpUserDto);
  }

  @Post('/login')
  async login(
    @Request() req: any,
    @Body() loginInfo: LoginUserDto,
    @Response({ passthrough: true }) res: any,
  ) {
    const result = await this.authService.login(loginInfo);

    res.cookie('refreshToken', result.body.refresh_token, {
      expires: new Date(new Date().setDate(new Date().getDate() + 7)),
      sameSite: 'none',
      httpOnly: true,
      secure: false,
    });
    res.header('Access-Control-Allow-Origin', req.headers.origin);

    return result;
  }

  @Get('/refresh')
  async refreshTokens(
    @Request() req: any,
    @Response({ passthrough: true }) res: any,
  ) {
    return await this.authService.refreshTokens(
      res,
      req,
      req.cookies.refreshToken,
    );
  }

  @Get('/logout')
  async logout(@Request() req: any, @Response({ passthrough: true }) res: any) {
    return await this.authService.logout(req, res);
  }

  @Post('social-login')
  async socialLogin(
    @Request() request,
    @Body() socialLoginDto: SocialLoginDto,
    @Response({ passthrough: true }) res,
  ) {
    return await this.authService.socialLogin(request, socialLoginDto, res);
  }
}
