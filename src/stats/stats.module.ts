import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/bookings.entity';
import { Event } from 'src/events/events.entity';
import { User } from 'src/users/users.entity';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Event, User])],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
