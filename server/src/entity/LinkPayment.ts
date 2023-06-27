import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,OneToOne } from "typeorm";
import { Appointment } from "./Appointment";
import { Clinics } from "./Clinics";
import { Treatments } from "./Treatments";
@Entity()
export class LinkPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: string;

  @Column()
  paymentLink: string;

  @OneToOne(() => Appointment)
  appointment: Appointment;

  @ManyToOne(() => Clinics,clinics => clinics.linkPayment)
  clinic: Clinics;

  @ManyToOne(() => Treatments,treatments => treatments.linkPayment)
  treatment: Treatments;

  @Column({nullable : true})
  description: string;

  @Column({nullable : true})
  dateTime: Date;
}
