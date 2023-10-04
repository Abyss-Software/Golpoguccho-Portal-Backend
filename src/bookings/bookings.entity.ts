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
  bookingTitle: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  contactPrimary: string;

  @Column({ nullable: true })
  contactSecondary: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  status: string;

  // @Column({ nullable: true })
  // physicalCopy: boolean;

  @Column({ nullable: true })
  images: string;

  @Column({ nullable: true })
  feedback: string;

  @Column({ nullable: true })
  review: string;

  @Column({ nullable: true })
  promoCode: string;

  @Column()
  totalPayment: number;

  @Column()
  advancePayment: number;

  @Column({ nullable: true })
  advancePaymentMethod: string;

  @Column({ nullable: true })
  advancePaymentDate: Date;

  @Column({ nullable: true })
  advanceTransactionId: string;

  @Column()
  duePayment: number;

  @Column({ nullable: true })
  duePaymentMethod: string;

  @Column({ nullable: true })
  duePaymentDate: Date;

  @Column({ nullable: true })
  dueTransactionId: string;
}
