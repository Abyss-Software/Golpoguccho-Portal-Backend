import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from 'config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { EmployeesModule } from './employees/employees.module';
import { EventsModule } from './events/events.module';
import { ExceptionsFiltersModule } from './exceptions-filters/exceptions-fitlers.module';
import { EmailService } from './mail/mail.service';
import { PackagesModule } from './packages/packages.module';
import { PaymentModule } from './payment/payment.module';
import { PromoModule } from './promo/promo.module';
import { UsersModule } from './users/users.module';
import { StatsModule } from './stats/stats.module';
import { FinanceModule } from './finance/finance.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        ca: process.env.DB_CA,
        rejectUnauthorized: true,
      },}),
    AuthModule,
    UsersModule,
    PackagesModule,
    EventsModule,
    BookingsModule,
    AppConfigModule,
    PaymentModule,
    PromoModule,
    EmployeesModule,
    ExceptionsFiltersModule,
    StatsModule,
    FinanceModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
