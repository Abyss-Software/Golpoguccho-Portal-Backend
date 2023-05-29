import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Package } from './packages.entity';

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

  @Column()
  status: string;

  @Column()
  created_at: Date;
}
