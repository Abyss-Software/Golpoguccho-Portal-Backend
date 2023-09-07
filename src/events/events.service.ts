import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/bookings.entity';
import { Category } from 'src/packages/categories.entity';
import { Package } from 'src/packages/packages.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './events.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Package)
    private readonly packageRepo: Repository<Package>,
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
  ) {}

  async createEvent(events: CreateEventDto[], bookingId: string) {
    try {
      const booking = await this.bookingRepo.findOneBy({ id: bookingId });

      if (!booking) return { status: 404, message: 'Booking not found' };

      const eventResult = await Promise.all(
        events.map(async (event) => {
          const categoryItem = await this.categoryRepo.findOneBy({
            id: event.categoryId,
          });

          if (!categoryItem)
            return { status: 404, message: 'Category not found' };

          const packageItem = await this.packageRepo.findOneBy({
            id: event.packageId,
          });

          if (!packageItem)
            return { status: 404, message: 'Package not found' };

          const newEvent = this.eventRepo.create({
            category: categoryItem,
            package: packageItem,
            booking: booking,
            title: event.eventTitle,
            event_date: event.eventDate,
            start_time: event.eventTime,
            end_time: event.eventEndTime,
            venue: event.eventVenue,
            location: event.eventVenueAddress,
            number_of_guests: event.numberOfGuests,
            day_or_evening: event.dayOrEvening,
            dhaka_or_outside: event.dhakaOrOutside,
            additional_info: event.additionalInfo,
          });

          return await this.eventRepo.save(newEvent);
        }),
      );
      console.log(eventResult);
      return eventResult;
    } catch (error) {
      return error;
    }
  }
}
