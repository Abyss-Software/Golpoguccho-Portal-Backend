import { AssignedEmployees } from 'src/events/assignedEmployees.entity';
import { User } from 'src/users/users.entity';
import { BaseEntity } from 'src/utils/base.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Employee extends BaseEntity {
  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;

  @OneToMany(
    () => AssignedEmployees,
    (assignedEmployee) => assignedEmployee.employee,
    { nullable: true },
  )
  assignedEvents: AssignedEmployees[];

  @Column({ nullable: true })
  avatar: string;

  @Column()
  position: string;

  @Column()
  contactPrimary: string;

  @Column({ nullable: true })
  contactSecondary: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  verificationType: string;

  @Column({ nullable: true })
  verificationId: string;

  @Column({ nullable: true })
  baseSalary: number;

  @Column({ nullable: true })
  monthlySalary: number;
}
