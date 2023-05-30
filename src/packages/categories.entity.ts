import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Package } from './packages.entity';
import { Event } from 'src/events/events.entity';
import { BaseEntity } from 'src/utils/base.entity';

@Entity()
export class Category extends BaseEntity {
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
}
