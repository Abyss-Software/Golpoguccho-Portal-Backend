import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from 'config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { EventsModule } from './events/events.module';
import { PackagesModule } from './packages/packages.module';
import { UsersModule } from './users/users.module';
import { PaymentModule } from './payment/payment.module';
import { PromoModule } from './promo/promo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true, // Load entity classes automatically from the "entities" array.
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    PackagesModule,
    EventsModule,
    BookingsModule,
    AppConfigModule,
    PaymentModule,
    PromoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
