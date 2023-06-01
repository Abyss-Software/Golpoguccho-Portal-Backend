import { Booking } from 'src/bookings/bookings.entity';
import { Category } from 'src/packages/categories.entity';
import { Package } from 'src/packages/packages.entity';
import { BaseEntity } from 'src/utils/base.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  start_time: Date;

  @Column()
  end_time: Date;

  @Column()
  event_date: Date;

  @Column()
  venue: string;

  @Column()
  location: string;

  @Column()
  number_of_guests: number;

  @Column()
  physical_copy: boolean;

  @Column()
  feedback: string;

  @Column()
  status: string;

  @Column()
  review: string;
}
