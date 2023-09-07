import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/events.entity';
import { EventsModule } from 'src/events/events.module';
import { User } from 'src/users/users.entity';
import { BookingsController } from './bookings.controller';
import { Booking } from './bookings.entity';
import { BookingsService } from './bookings.service';

@Module({
  imports: [EventsModule, TypeOrmModule.forFeature([Booking, Event, User])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
