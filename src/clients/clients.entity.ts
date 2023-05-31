import { BaseEntity } from 'src/utils/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Client extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  role: 'client';
}
