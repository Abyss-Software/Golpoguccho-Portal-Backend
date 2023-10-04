import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/bookings.entity';
import { Event } from 'src/events/events.entity';
import { User } from 'src/users/users.entity';
import { successHandler } from 'src/utils/response.handler';
import { Between, Repository } from 'typeorm';
import { StatsBetweenDto } from './dto/stat.dto';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getTotalCounts() {
    const totalBookings = await this.bookingRepo.count();
    const totalEvents = await this.eventRepo.count();
    const totalUsers = await this.userRepo.count();
    return successHandler('Total Counts', {
      bookings: totalBookings,
      events: totalEvents,
      users: totalUsers,
    });
  }

  async getBestSellers() {
    const topSellingPackages = await this.eventRepo
      .createQueryBuilder('event')
      .select(['package.title as packageName', 'COUNT(package.title) as count'])
      .innerJoin('event.package', 'package')
      .groupBy('package.title')
      .orderBy('count', 'DESC')
      .limit(10)
      .getRawMany();

    return successHandler('Best Selling Packages', topSellingPackages);
  }

  async getTotalsBetween(statsBetween: StatsBetweenDto) {
    const startDate = new Date(statsBetween.start);
    const endDate = new Date(statsBetween.end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error(
        'Invalid date format. Please provide valid date strings.',
      );
    }

    const totalBookings = await this.bookingRepo.count({
      where: {
        createdAt: Between(startDate, endDate),
      },
    });

    const totalEvents = await this.eventRepo.count({
      where: {
        event_date: Between(startDate, endDate),
      },
    });

    const totalUsers = await this.userRepo.count({
      where: {
        createdAt: Between(startDate, endDate),
      },
    });

    const topSellingPackages = await this.eventRepo
      .createQueryBuilder('event')
      .select(['package.title as packageName', 'COUNT(package.title) as count'])
      .innerJoin('event.package', 'package')
      .where('event.event_date >= :startDate', { startDate })
      .andWhere('event.event_date <= :endDate', { endDate })
      .groupBy('package.title')
      .orderBy('count', 'DESC')
      .limit(10)
      .getRawMany();

    console.log(topSellingPackages);

    return successHandler('Total Counts', {
      bookings: totalBookings,
      events: totalEvents,
      users: totalUsers,
      topSellingPackages,
    });
  }

  // async getMonthlyCounts(statsBetween: StatsBetweenDto) {
  //   const startDate = new Date(statsBetween.start);
  //   const endDate = new Date(statsBetween.end);

  //   if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
  //     throw new Error(
  //       'Invalid date format. Please provide valid date strings.',
  //     );
  //   }

  //   // Initialize an array to store monthly counts
  //   const monthlyCounts = [];

  //   // Initialize the current month and year
  //   let currentMonth = startDate.getMonth() + 1; // Adding 1 to match JavaScript month numbering (1-12)
  //   let currentYear = startDate.getFullYear();

  //   // Calculate counts for each month within the date range
  //   while (
  //     currentYear < endDate.getFullYear() ||
  //     (currentYear === endDate.getFullYear() &&
  //       currentMonth <= endDate.getMonth() + 1)
  //   ) {
  //     const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
  //     const endOfMonth = new Date(currentYear, currentMonth, 0);

  //     const totalBookings = await this.bookingRepo.count({
  //       where: {
  //         createdAt: Between(startOfMonth, endOfMonth),
  //       },
  //     });

  //     const totalEvents = await this.eventRepo.count({
  //       where: {
  //         event_date: Between(startOfMonth, endOfMonth),
  //       },
  //     });

  //     const totalUsers = await this.userRepo.count({
  //       where: {
  //         createdAt: Between(startOfMonth, endOfMonth),
  //       },
  //     });

  //     // Add the counts for the current month to the array
  //     monthlyCounts.push({
  //       year: currentYear,
  //       month: currentMonth,
  //       bookings: totalBookings,
  //       events: totalEvents,
  //       users: totalUsers,
  //     });

  //     // Move to the next month
  //     if (currentMonth === 12) {
  //       currentMonth = 1;
  //       currentYear++;
  //     } else {
  //       currentMonth++;
  //     }
  //   }

  //   // Format the data for the frontend
  //   const labels = monthlyCounts.map((entry) => `${entry.year}-${entry.month}`);
  //   const bookingsData = monthlyCounts.map((entry) => entry.bookings);
  //   const eventsData = monthlyCounts.map((entry) => entry.events);
  //   const usersData = monthlyCounts.map((entry) => entry.users);

  //   return {
  //     labels,
  //     datasets: [
  //       {
  //         label: 'Bookings',
  //         data: bookingsData,
  //         borderColor: 'rgb(255, 99, 132)',
  //         backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //       },
  //       {
  //         label: 'Events',
  //         data: eventsData,
  //         borderColor: 'rgb(53, 162, 235)',
  //         backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //       },
  //       {
  //         label: 'Users',
  //         data: usersData,
  //         borderColor: 'rgb(75, 192, 192)',
  //         backgroundColor: 'rgba(75, 192, 192, 0.5)',
  //       },
  //     ],
  //   };
  // }

  async getMonthlyCounts(statsBetween: StatsBetweenDto) {
    const startDate = new Date(statsBetween.start);
    const endDate = new Date(statsBetween.end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error(
        'Invalid date format. Please provide valid date strings.',
      );
    }

    const monthlyCounts = [];

    let currentMonth = startDate.getMonth() + 1;
    let currentYear = startDate.getFullYear();

    while (
      currentYear < endDate.getFullYear() ||
      (currentYear === endDate.getFullYear() &&
        currentMonth <= endDate.getMonth() + 1)
    ) {
      const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
      const endOfMonth = new Date(currentYear, currentMonth, 0);

      const [totalBookings, totalEvents, totalUsers] = await Promise.all([
        this.bookingRepo.count({
          where: {
            createdAt: Between(startOfMonth, endOfMonth),
          },
        }),
        this.eventRepo.count({
          where: {
            event_date: Between(startOfMonth, endOfMonth),
          },
        }),
        this.userRepo.count({
          where: {
            createdAt: Between(startOfMonth, endOfMonth),
          },
        }),
      ]);

      monthlyCounts.push({
        year: currentYear,
        month: currentMonth,
        bookings: totalBookings,
        events: totalEvents,
        users: totalUsers,
      });

      if (currentMonth === 12) {
        currentMonth = 1;
        currentYear++;
      } else {
        currentMonth++;
      }
    }

    const labels = monthlyCounts.map((entry) => `${entry.year}-${entry.month}`);
    const bookingsData = monthlyCounts.map((entry) => entry.bookings);
    const eventsData = monthlyCounts.map((entry) => entry.events);
    const usersData = monthlyCounts.map((entry) => entry.users);

    return {
      labels,
      datasets: [
        {
          label: 'Bookings',
          data: bookingsData,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Events',
          data: eventsData,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Users',
          data: usersData,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ],
    };
  }
}
