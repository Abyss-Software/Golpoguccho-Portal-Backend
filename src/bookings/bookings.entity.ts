import { Event } from 'src/events/events.entity';
import { User } from 'src/users/users.entity';
import { BaseEntity } from 'src/utils/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Booking extends BaseEntity {
  @ManyToOne(() => User, (user) => user.bookings)
  client: User;

  @OneToMany(() => Event, (event) => event.booking, { nullable: true })
  events: Event[];

  @Column()
  title: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  contact_primary: string;

  @Column({ nullable: true })
  contact_secondary: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  physical_copy: boolean;

  @Column({ nullable: true })
  feedback: string;

  @Column({ nullable: true })
  review: string;

  @Column({ nullable: true })
  additional_information: string;

  @Column({ nullable: true })
  promo_code: string;

  @Column()
  total_payment: number;

  @Column({ nullable: true })
  payment_status: string;

  @Column()
  advance_payment: number;

  @Column({ nullable: true })
  advance_method: string;

  @Column({ nullable: true })
  advance_date: Date;

  @Column({ nullable: true })
  advance_transaction: string;

  @Column()
  due_payment: number;

  @Column({ nullable: true })
  due_method: string;

  @Column({ nullable: true })
  due_date: Date;

  @Column({ nullable: true })
  due_transaction: string;
}
