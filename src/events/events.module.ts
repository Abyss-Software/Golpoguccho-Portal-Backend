import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/bookings.entity';
import { Employee } from 'src/employees/employees.entity';
import { Event } from 'src/events/events.entity';
import { EmailService } from 'src/mail/mail.service';
import { Category } from 'src/packages/categories.entity';
import { Package } from 'src/packages/packages.entity';
import { AssignedEmployees } from './assignedEmployees.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Booking,
      Event,
      Category,
      Package,
      Employee,
      AssignedEmployees,
    ]),
  ],
  providers: [EventsService, EmailService],
  controllers: [EventsController],
  exports: [EventsService],
})
export class EventsModule {}
