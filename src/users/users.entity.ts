import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ length: 500 })
    name: string;
    
    @Column("text")
    email: string;
    
    @Column("text")
    password: string;

    @Column("text")
    role: string;

    @Column("text")
    address: string;

    @Column("text")
    phone_primary: string;

    @Column("text")
    phone_secondary: string;

    @Column("text")
    position: string;

    @Column("text")
    verification_type: string;

    @Column("text")
    verification_id: string;

    @Column()
    base_salary: number;

    @Column()
    monthly_salary: number;
    }