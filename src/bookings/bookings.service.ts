import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/events/events.entity';
import { EventsService } from 'src/events/events.service';
import { User } from 'src/users/users.entity';
import { bookingStatus } from 'src/utils/constants/bookingStatus';
import { errorhandler, successHandler } from 'src/utils/response.handler';
import { Repository } from 'typeorm';
import { Booking } from './bookings.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { DuePaymentDto } from './dto/due-payment.dto';

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
    const clientAccount = await this.userRepo.findOneBy({
      id: createBookingDto.clientId,
    });
    console.log(createBookingDto);

    if (!clientAccount) return errorhandler(404, 'Client account not found');
    console.log('promoCode', createBookingDto.promoCode);
    const booking = this.bookingRepo.create({
      client: clientAccount,
      bookingTitle: createBookingDto.bookingTitle,
      fullName: createBookingDto.fullName,
      email: createBookingDto.email,
      contactPrimary: createBookingDto.contactPrimary,
      contactSecondary: createBookingDto.contactSecondary,
      address: createBookingDto.address,
      city: createBookingDto.city,
      status: bookingStatus.pending,
      promoCode: createBookingDto.promoCode,
      totalPayment: createBookingDto.totalPayment,
      advancePayment: createBookingDto.advancePayment,
      advancePaymentMethod: createBookingDto.advancePaymentMethod,
      advancePaymentDate: new Date(),
      advanceTransactionId: createBookingDto.advanceTransactionId,
      duePayment: createBookingDto.duePayment,
    });

    const bookingResult = await this.bookingRepo.save(booking);

    const eventResult = await this.eventsService.createEvent(
      createBookingDto.events,
      bookingResult.id,
    );

    return successHandler('Booking Created Successfully!', {
      bookingResult,
      eventResult,
    });
  }

  async getAllBookings() {
    const bookings = await this.bookingRepo.find({
      relations: ['events'],
    });

    return successHandler('All Bookings', bookings);
  }

  async getBookingById(bookingId: string) {
    console.log(bookingId);
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId },
      relations: ['events', 'events.category', 'events.package'],
    });
    // .createQueryBuilder('booking')
    // .innerJoinAndSelect('booking.events', 'events')
    // .leftJoinAndSelect('events.category', 'categories')
    // .leftJoinAndSelect('events.package', 'packages')
    // .leftJoinAndSelect('booking.client', 'users')
    // .where('booking.id=:id')
    // .setParameter('id', bookingId)
    // .getOne();

    console.log(booking);

    if (!booking) return errorhandler(404, 'Booking not found');

    return booking;
  }

  async getBookingsByClientId(clientId: string) {
    const bookings = await this.bookingRepo.find({
      where: { client: { id: clientId } },
      relations: ['events', 'client'],
    });

    return bookings;
  }

  async makeDuePayment(duePaymentDto: DuePaymentDto) {
    const booking = await this.bookingRepo.findOne({
      where: { id: duePaymentDto.bookingId },
      relations: ['events', 'events.category', 'events.package'],
    });

    if (!booking) return errorhandler(404, 'Booking not found');

    booking.duePaymentMethod = duePaymentDto.duePaymentMethod;
    booking.dueTransactionId = duePaymentDto.dueTransactionId;
    booking.duePaymentDate = new Date();

    const bookingResult = await this.bookingRepo.save(booking);

    return successHandler('Due Payment Made Successfully!', bookingResult);
  }

  async changeStatus(statusUpdateDto: { bookingId: string; status: string }) {
    const booking = await this.bookingRepo.findOne({
      where: { id: statusUpdateDto.bookingId },
      relations: ['events', 'events.category', 'events.package'],
    });

    if (!booking) return errorhandler(404, 'Booking not found');

    booking.status = statusUpdateDto.status;

    const bookingResult = await this.bookingRepo.save(booking);

    return successHandler(
      'Booking Status Updated Successfully!',
      bookingResult,
    );
  }

  async setLibraryLink(libraryLinkDto: { bookingId: string; link: string }) {
    const booking = await this.bookingRepo.findOne({
      where: { id: libraryLinkDto.bookingId },
      relations: ['events', 'events.category', 'events.package'],
    });

    if (!booking) return errorhandler(404, 'Booking not found');

    booking.images = libraryLinkDto.link;

    const bookingResult = await this.bookingRepo.save(booking);

    return successHandler('Library Link Updated Successfully!', bookingResult);
  }

  async giveFeedback(feedbackDto: {
    bookingId: string;
    feedback?: string;
    review?: string;
  }) {
    const booking = await this.bookingRepo.findOne({
      where: { id: feedbackDto.bookingId },
      relations: ['events', 'events.category', 'events.package'],
    });

    if (!booking) return errorhandler(404, 'Booking not found');

    booking.feedback = feedbackDto.feedback;
    booking.review = feedbackDto.review;

    const bookingResult = await this.bookingRepo.save(booking);

    return successHandler('Feedback Updated Successfully!', bookingResult);
  }
}
