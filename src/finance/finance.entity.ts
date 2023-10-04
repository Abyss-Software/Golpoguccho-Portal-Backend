import { BaseEntity } from 'src/utils/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class FinancialRecord extends BaseEntity {
  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  transactionDate: Date;

  @Column()
  amount: number;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  medium: string;

  @Column({ nullable: true, default: 'N/A' })
  trxId: string;
}
