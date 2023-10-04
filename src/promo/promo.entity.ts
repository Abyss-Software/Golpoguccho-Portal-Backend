import { BaseEntity } from 'src/utils/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Promo extends BaseEntity {
  @Column()
  promo_code: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  percentage: number;

  @Column()
  max_use: number;

  @Column()
  max_discount: number;

  @Column({ nullable: true })
  expiry_date: Date;

  @Column()
  status: string;

  @Column({ default: 0 })
  used: number;
}
