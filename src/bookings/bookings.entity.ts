import { BaseEntity } from 'src/utils/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Booking extends BaseEntity {
  @Column()
  name: string;
}
