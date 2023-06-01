import { Booking } from 'src/bookings/bookings.entity';
import { BaseEntity } from 'src/utils/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Client extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  role: 'client';

  @OneToMany(() => Booking, (booking) => booking.client, { nullable: true })
  bookings: Booking[];
}
