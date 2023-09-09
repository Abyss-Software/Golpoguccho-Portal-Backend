import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/events/events.entity';
import { EventsService } from 'src/events/events.service';
import { User } from 'src/users/users.entity';
import { errorhandler } from 'src/utils/response.handler';
import { Repository } from 'typeorm';
import { Booking } from './bookings.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    private readonly eventsService: EventsService,
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto) {
    try {
      const clientAccount = await this.userRepo.findOneBy({
        id: createBookingDto.clientId,
      });

      if (!clientAccount) return errorhandler(404, 'Client account not found');

      const booking = this.bookingRepo.create({
        address: createBookingDto.address,
        city: createBookingDto.city,
        contact_primary: createBookingDto.contactPrimary,
        contact_secondary: createBookingDto.contactSecondary,
        email: createBookingDto.email,
        name: createBookingDto.fullName,
        title: createBookingDto.bookingTitle,
        client: clientAccount,
        status: 'pending',
        additional_information: createBookingDto.additionalInfo,
        promo_code: createBookingDto.promoCode,
        advance_payment: createBookingDto.advancePayment,
        due_payment: createBookingDto.duePayment,
        total_payment: createBookingDto.totalPayment,
        physical_copy: createBookingDto.physicalCopy,
      });

      const bookingResult = await this.bookingRepo.save(booking);

      const eventResult = await this.eventsService.createEvent(
        createBookingDto.events,
        bookingResult.id,
      );

      return booking;
    } catch (error) {
      return error;
    }
  }

  async getAllBookings() {
    try {
      const bookings = await this.bookingRepo.find({
        relations: ['events', 'client'],
      });

      return bookings;
    } catch (error) {
      return error;
    }
  }

  async getBookingById(bookingId: string) {
    try {
      const booking = await this.bookingRepo.findOneBy({ id: bookingId });

      if (!booking) return errorhandler(404, 'Booking not found');

      return booking;
    } catch (error) {
      return error;
    }
  }

  async getBookingsByClientId(clientId: string) {
    try {
      const bookings = await this.bookingRepo.find({
        where: { client: { id: clientId } },
        relations: ['events', 'client'],
      });

      return bookings;
    } catch (error) {
      return error;
    }
  }

  async updateBooking(bookingId: string, attributes: CreateBookingDto) {
    try {
      const booking = await this.bookingRepo.findOneBy({ id: bookingId });

      if (!booking) return errorhandler(404, 'Booking not found');

      const updatedBooking = await this.bookingRepo.save({
        address: attributes.address,
        city: attributes.city,
        contact_primary: attributes.contactPrimary,
        contact_secondary: attributes.contactSecondary,
        email: attributes.email,
        name: attributes.fullName,
        title: attributes.bookingTitle,
        status: 'pending',
        additional_information: attributes.additionalInfo,
        promo_code: attributes.promoCode,
        advance_payment: attributes.advancePayment,
        due_payment: attributes.duePayment,
        total_payment: attributes.totalPayment,
        physical_copy: attributes.physicalCopy,
      });

      return updatedBooking;
    } catch (error) {
      return error;
    }
  }
}
