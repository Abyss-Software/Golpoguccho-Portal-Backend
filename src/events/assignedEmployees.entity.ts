import { Employee } from 'src/employees/employees.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Event } from './events.entity';

@Entity()
export class AssignedEmployees {
  @PrimaryColumn()
  eventId: string;

  @PrimaryColumn()
  employeeId: string;

  @ManyToOne(() => Event, (event) => event.assignedEmployees, {
    nullable: true,
  })
  event: Event;

  @ManyToOne(() => Employee, (employee) => employee.assignedEvents, {
    nullable: true,
  })
  employee: Employee;

  @Column()
  position: string;

  @Column()
  payment: number;
}
