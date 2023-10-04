import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/events.entity';
import { EventsModule } from 'src/events/events.module';
import { FinanceModule } from 'src/finance/finance.module';
import { EmailService } from 'src/mail/mail.service';
import { User } from 'src/users/users.entity';
import { BookingsController } from './bookings.controller';
import { Booking } from './bookings.entity';
import { BookingsService } from './bookings.service';

@Module({
  imports: [
    EventsModule,
    FinanceModule,
    TypeOrmModule.forFeature([Booking, Event, User]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService, EmailService],
})
export class BookingsModule {}
