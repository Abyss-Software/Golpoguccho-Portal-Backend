import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/clients/clients.entity';
import { ClientsModule } from 'src/clients/clients.module';
import { User } from 'src/users/users.entity';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from 'src/utils/auth/strategy/jwt.strategy';
import { PasswordStrategy } from 'src/utils/auth/strategy/password.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    ClientsModule,
    TypeOrmModule.forFeature([User, Client]),
    JwtModule.register({}),
  ],
  providers: [AuthService, JwtStrategy, PasswordStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
