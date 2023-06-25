import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Appointment } from "./Appointment";
export enum Role {
  clinic = "clinic",
  super_clinic = "super_clinic",
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @Column()
  birthday: Date;

  @Column({
    type: "enum",
    enum: Role,
    default: "clinic",
  })
  role: Role;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];
}
