import { Client } from 'src/clients/clients.entity';
import { Event } from 'src/events/events.entity';
import { BaseEntity } from 'src/utils/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Booking extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Client, (client) => client.bookings, { nullable: true })
  client: Client;

  @OneToMany(() => Event, (event) => event.booking, { nullable: true })
  events: Event[];

  @Column()
  phone_primary: string;

  @Column()
  phone_secondary: string;

  @Column()
  total_payment: number;

  @Column()
  advance_payment: number;

  @Column()
  due_payment: number;
}
