import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { JwtModule } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/utils/auth/strategy/jwt.strategy';
import { ClientsModule } from 'src/clients/clients.module';
import { Client } from 'src/clients/clients.entity';

@Module({
  imports: [
    UsersModule,
    ClientsModule,
    TypeOrmModule.forFeature([User, Client]),
    JwtModule.register({}),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
