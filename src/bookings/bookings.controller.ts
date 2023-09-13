import {
  Body,
  Catch,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateEventDto } from 'src/events/dto/create-event.dto';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { DuePaymentDto } from './dto/due-payment.dto';

@Catch()
@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @ApiBearerAuth()
  @Post('create-booking')
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    return await this.bookingsService.createBooking(createBookingDto);
  }

  @ApiBearerAuth()
  @Post('create-event')
  async createEvent(@Body() createEventDto: CreateEventDto) {}

  @Get()
  async getBookings() {
    return await this.bookingsService.getAllBookings();
  }

  @Get('/:id')
  async getBookingById(@Param('id') id: string) {
    return await this.bookingsService.getBookingById(id);
  }

  //get bookings by client id
  @Get('client/:id')
  async getBookingsByClientId(@Param('id') id: string) {
    return await this.bookingsService.getBookingsByClientId(id);
  }

  @Patch('due-payment')
  async makeDuePayment(@Body() duePaymentDto: DuePaymentDto) {
    return await this.bookingsService.makeDuePayment(duePaymentDto);
  }

  @Patch('status')
  async changeStatus(
    @Body() statusUpdateDto: { bookingId: string; status: string },
  ) {
    return await this.bookingsService.changeStatus(statusUpdateDto);
  }

  @Patch('link')
  async setLibraryLink(
    @Body() libraryLinkDto: { bookingId: string; link: string },
  ) {
    return await this.bookingsService.setLibraryLink(libraryLinkDto);
  }

  @Patch('review')
  async giveFeedback(
    @Body()
    feedbackDto: {
      bookingId: string;
      feedback?: string;
      review?: string;
    },
  ) {
    return await this.bookingsService.giveFeedback(feedbackDto);
  }

  //   @Delete('/:id')
  //   async deleteBooking(@Param('id') id: string) {
  //     return await this.bookingsService.deleteBooking(id);
  //   }
}

// @Get('events/:id')
// async getEventsByBookingId(@Param('id') id: string) {
//   return await this.bookingsService.getEventsByBookingId(id);
// }

// @Get('events/:id')
// async getEventById(@Param('id') id: string) {
//   return await this.bookingsService.getEventById(id);
// }

// @Patch('events/:id')
// async updateEvent(
//   @Param('id') id: string,
//   @Body() updateEventDto: CreateBookingDto,
// ) {
//   return await this.bookingsService.updateEvent(id, updateEventDto);
// }

// @Delete('events/:id')
// async deleteEvent(@Param('id') id: string) {
//   return await this.bookingsService.deleteEvent(id);
// }
