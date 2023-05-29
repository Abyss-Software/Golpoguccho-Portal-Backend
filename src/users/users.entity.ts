import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  address: string;

  @Column()
  phone_primary: string;

  @Column()
  phone_secondary: string;

  @Column()
  position: string;

  @Column()
  verification_type: string;

  @Column()
  verification_id: string;

  @Column()
  base_salary: number;

  @Column()
  monthly_salary: number;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  created_at: Date;
}
