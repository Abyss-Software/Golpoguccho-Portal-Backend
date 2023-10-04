import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/bookings.entity';
import { Employee } from 'src/employees/employees.entity';
import { EmailService } from 'src/mail/mail.service';
import { Category } from 'src/packages/categories.entity';
import { Package } from 'src/packages/packages.entity';
import { Repository } from 'typeorm';
import { AssignedEmployees } from './assignedEmployees.entity';
import { assignedEmployeesDto } from './dto/assign-employee.dto';
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
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
    @InjectRepository(AssignedEmployees)
    private readonly assignedEmployeesRepo: Repository<AssignedEmployees>,
    private readonly emailService: EmailService,
  ) {}

  async createEvent(events: CreateEventDto[], bookingId: string) {
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

        if (!packageItem) return { status: 404, message: 'Package not found' };

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
          status: 'PENDING',
        });

        return await this.eventRepo.save(newEvent);
      }),
    );

    return eventResult;
  }

  async getAllEvents() {
    const events = await this.eventRepo.find({
      relations: ['category', 'package', 'assignedEmployees'],
    });

    return events;
  }

  async getEventById(eventId: string) {
    const event = await this.eventRepo.findOne({
      where: { id: eventId },
      relations: [
        'category',
        'package',
        'assignedEmployees',
        'assignedEmployees.employee',
        'assignedEmployees.employee.user',
      ],
    });
    return event;
  }

  async getEventsByEmployeeId(employeeId: string) {
    const events = await this.assignedEmployeesRepo.find({
      where: { employeeId: employeeId },
      relations: [
        'event',
        'event.category',
        'event.package',
        'event.assignedEmployees',
        'event.assignedEmployees.employee',
        'event.assignedEmployees.employee.user',
      ],
    });

    return events;
  }

  async updateAllEventStatus() {
    const events = await this.eventRepo.find();
    for (const event of events) {
      if (event.event_date < new Date()) {
        event.status = 'COMPLETED';
        await this.eventRepo.save(event);
      }
    }
    return events;
  }

  async assignEmployeeToEvent(data: assignedEmployeesDto) {
    const event = await this.eventRepo.findOneBy({ id: data.eventId });
    if (!event) return { status: 404, message: 'Event not found' };

    data.assignedEmployees.map(async (employee) => {
      const employeeItem = await this.employeeRepo.findOne({
        where: { id: employee.employeeId },
        relations: ['user'],
      });
      if (!employeeItem) return { status: 404, message: 'Employee not found' };

      const assignedEmployee = this.assignedEmployeesRepo.create({
        event: event,
        employee: employeeItem,
        position: employee.position,
        payment: employee.payment,
      });

      this.emailService.sendEventAssignMail({
        email: employeeItem.user.email,
        eventTitle: event.title,
        venue: event.venue,
        location: event.location,
        eventDate: new Date(event.event_date).toDateString(),
        startTime: event.start_time,
      });

      await this.assignedEmployeesRepo.save(assignedEmployee);
    });

    return { status: 200, message: 'Employee assigned successfully' };
  }
}
