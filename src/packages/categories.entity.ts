import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Package } from './packages.entity';
import { Event } from 'src/events/events.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  description: string;

  @OneToMany(() => Package, (packageItem) => packageItem.category, {
    nullable: true,
  })
  packages: Package[];

  @OneToMany(() => Event, (event) => event.category, {
    nullable: true,
  })
  events: Event[];

  @Column()
  status: string;

  @Column()
  created_at: Date;
}
