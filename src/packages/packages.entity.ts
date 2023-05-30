import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './categories.entity';
import { Event } from 'src/events/events.entity';
import { BaseEntity } from 'src/utils/base.entity';

@Entity()
export class Package extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.packages)
  category: Category;

  @OneToMany(() => Event, (event) => event.package, { nullable: true })
  events: Event[];

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  status: string;
}
