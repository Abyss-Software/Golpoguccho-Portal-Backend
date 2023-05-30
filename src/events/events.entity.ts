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
  @Column()
  booking_id: number;

  @ManyToOne(() => Category, (category) => category.events)
  category: Category;

  @ManyToOne(() => Package, (packageItem) => packageItem.events)
  package: Package;

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
  physical_copy: boolean;

  @Column()
  feedback: string;

  @Column()
  status: string;

  @Column()
  review: string;
}
