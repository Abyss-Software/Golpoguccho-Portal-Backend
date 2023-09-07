import { Booking } from 'src/bookings/bookings.entity';
import { Category } from 'src/packages/categories.entity';
import { Package } from 'src/packages/packages.entity';
import { BaseEntity } from 'src/utils/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Event extends BaseEntity {
  @ManyToOne(() => Category, (category) => category.events, { nullable: true })
  category: Category;

  @ManyToOne(() => Package, (packageItem) => packageItem.events, {
    nullable: true,
  })
  package: Package;

  @ManyToOne(() => Booking, (booking) => booking.events, { nullable: true })
  booking: Booking;

  @Column()
  title: string;

  @Column()
  event_date: Date;

  @Column()
  start_time: string;

  @Column()
  end_time: string;

  @Column()
  venue: string;

  @Column()
  location: string;

  @Column()
  number_of_guests: number;

  @Column()
  day_or_evening: string;

  @Column()
  dhaka_or_outside: string;

  @Column()
  additional_info: string;
}
