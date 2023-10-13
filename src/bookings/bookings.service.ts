import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/events/events.entity';
import { EventsService } from 'src/events/events.service';
import { FinanceService } from 'src/finance/finance.service';
import {
  EmailService,
  IBookingCompleteMailProps,
  IBookingConfirmMailProps,
  ICompletePaymentMailProps,
} from 'src/mail/mail.service';
import { Package } from 'src/packages/packages.entity';
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
    private readonly financeService: FinanceService,
    private readonly emailService: EmailService,
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Package)
    private readonly packagesRepo: Repository<Package>,
    private jwtService: JwtService,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto) {
    const clientAccount = await this.userRepo.findOneBy({
      id: createBookingDto.clientId,
    });

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

    const adminsAndMods = await this.userRepo.find({
      where: [{ role: 'ADMIN' }, { role: 'MODERATOR' }],
    });

    const packages = await this.packagesRepo.find();

    const emailConfig = {
      bookingTitle: booking.bookingTitle,
      clientName: booking.fullName,
      eventCount: createBookingDto.events.length,
      packages: createBookingDto.events
        .map((event) => packages.find((p) => p.id === event.packageId).title)
        .join(', '),
      contactPrimary: booking.contactPrimary,
      contactSecondary: booking.contactSecondary,
      bookingDate: new Date().toDateString(),
      advancePayment: booking.advancePayment,
      advancePaymentMethod: booking.advancePaymentMethod,
      advanceTransactionId: booking.advanceTransactionId,
    };

    adminsAndMods.forEach((user) => {
      this.emailService.sendNewBookingEmail({
        ...emailConfig,
        email: user.email,
      });
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

  async getBookingById(bookingId: string, token: string) {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId },
      relations: ['events', 'events.category', 'events.package'],
    });

    if (!booking) return errorhandler(404, 'Booking not found');

    const decodedJwtRefreshToken: any = this.jwtService.decode(token);
    console.log(decodedJwtRefreshToken);

    if (decodedJwtRefreshToken.role == 'CLIENT' && !booking.duePaymentDate) {
      return { ...booking, images: null };
    }

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

    const emailConfig = {
      bookingTitle: booking.bookingTitle,
      clientName: booking.fullName,
      eventCount: booking.events.length,
      contactPrimary: booking.contactPrimary,
      contactSecondary: booking.contactSecondary,
      bookingDate: new Date().toDateString(),
      duePayment: booking.duePayment,
      duePaymentMethod: booking.duePaymentMethod,
      dueTransactionId: booking.dueTransactionId,
    };

    const adminsAndMods = await this.userRepo.find({
      where: [{ role: 'ADMIN' }, { role: 'MODERATOR' }],
    });

    adminsAndMods.forEach((user) => {
      this.emailService.sendDuePaymentEmail({
        ...emailConfig,
        email: user.email,
      });
    });

    return successHandler('Due Payment Made Successfully!', bookingResult);
  }

  async changeStatus(statusUpdateDto: { bookingId: string; status: string }) {
    const booking = await this.bookingRepo.findOne({
      where: { id: statusUpdateDto.bookingId },
      relations: [
        'events',
        'events.package',
        'events.assignedEmployees',
        'events.assignedEmployees.employee',
        'events.assignedEmployees.employee.user',
      ],
    });

    if (!booking) return errorhandler(404, 'Booking not found');

    booking.status = statusUpdateDto.status;

    const bookingResult = await this.bookingRepo.save(booking);

    if (statusUpdateDto.status === bookingStatus.confirmed) {
      this.financeService.createFinanceRecord({
        title: bookingResult.bookingTitle + ' Advance Payment',
        type: 'INCOME',
        transactionDate: bookingResult.createdAt,
        amount: booking.advancePayment,
        category: 'Booking Advance Payment',
        medium: booking.advancePaymentMethod,
        trxId: booking.advanceTransactionId,
      });

      console.log(booking.events);
      const emailConfig: IBookingConfirmMailProps = {
        email: booking.email,
        bookingTitle: booking.bookingTitle,
        clientName: booking.fullName,
        eventCount: booking.events.length,
        eventDates: booking.events
          .map((event) => event.event_date.toDateString())
          .join(', '),
        packages: booking.events.map((event) => event.package.title).join(', '),
        totalPayment: booking.totalPayment,
        advancePayment: booking.advancePayment,
        advancePaymentMethod: booking.advancePaymentMethod,
        advancePaymentInfo: booking.advanceTransactionId,
      };

      this.emailService.sendBookingConfirmEmail(emailConfig);
    } else if (statusUpdateDto.status === bookingStatus.completed) {
      this.financeService.createFinanceRecord({
        title: bookingResult.bookingTitle + ' Due Payment',
        type: 'INCOME',
        transactionDate: bookingResult.createdAt,
        amount: booking.duePayment,
        category: 'Booking Due Payment',
        medium: booking.duePaymentMethod,
        trxId: booking.dueTransactionId,
      });

      const emailConfig: IBookingCompleteMailProps = {
        email: booking.email,
        totalPayment: booking.totalPayment,
        duePayment: booking.duePayment,
        duePaymentMethod: booking.duePaymentMethod,
        duePaymentInfo: booking.dueTransactionId,
      };

      this.emailService.sendBookingCompleteEmail(emailConfig);
    }

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

    const emailConfig: ICompletePaymentMailProps = {
      email: booking.email,
      bookingTitle: booking.bookingTitle,
      totalPayment: booking.totalPayment,
      advancePayment: booking.advancePayment,
      duePayment: booking.duePayment,
    };

    this.emailService.sendCompletePaymentEmail(emailConfig);

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
