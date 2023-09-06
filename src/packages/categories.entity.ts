import { Event } from 'src/events/events.entity';
import { BaseEntity } from 'src/utils/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Package } from './packages.entity';

@Entity()
export class Category extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  image: string;

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
