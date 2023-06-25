import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Clinics } from "./Clinics";
import { Treatments } from "./Treatments";
import { Appointment } from "./Appointment";
@Entity()
export class Doctors {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  specialization: string;

  @Column()
  lastname: string;

  @Column()
  phone: string;

  @Column({
    nullable : true
  })
  image: string;

  @ManyToOne(() => Clinics, (clinic) => clinic.doctors)
  clinic: Clinics;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];

  @ManyToMany(() => Treatments, (treatments) => treatments.doctors)
  @JoinTable()
  treatments: Treatments[];
}
