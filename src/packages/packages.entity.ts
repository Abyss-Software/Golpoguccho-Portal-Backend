import { Event } from 'src/events/events.entity';
import { BaseEntity } from 'src/utils/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './categories.entity';

@Entity()
export class Package extends BaseEntity {
  @Column()
  title: string;

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
