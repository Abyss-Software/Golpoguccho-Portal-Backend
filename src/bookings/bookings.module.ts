import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/events.entity';
import { EventsModule } from 'src/events/events.module';
import { FinanceModule } from 'src/finance/finance.module';
import { EmailService } from 'src/mail/mail.service';
import { Package } from 'src/packages/packages.entity';
import { User } from 'src/users/users.entity';
import { BookingsController } from './bookings.controller';
import { Booking } from './bookings.entity';
import { BookingsService } from './bookings.service';

@Module({
  imports: [
    EventsModule,
    FinanceModule,
    TypeOrmModule.forFeature([Booking, Event, User, Package]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService, EmailService, JwtService],
})
export class BookingsModule {}
