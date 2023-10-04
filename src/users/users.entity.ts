import { Booking } from 'src/bookings/bookings.entity';
import { role } from 'src/utils/constants/role';
import { status } from 'src/utils/constants/status';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../utils/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ length: 500 })
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: role.client })
  role: string;

  @Column({ default: status.active })
  status: string;

  @OneToMany(() => Booking, (booking) => booking.client)
  bookings: Booking[];
}
