import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from "typeorm";
import { Appointment } from "./Appointment";
import { Clinics } from "./Clinics";
import { Treatments } from "./Treatments";
@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cardHolderName: string;

  @Column()
  cardNumber: string;

  @OneToOne(() => Appointment)
  appointment: Appointment;

  @ManyToOne(() => Clinics, clinics => clinics.payment)
  clinic: Clinics;

  @ManyToOne(() => Treatments, treatments => treatments.payment)
  treatment: Treatments;

  @Column()
  cardExpirationDate: string;

  @Column()
  cardCVV: string;

  @Column()
  amount: string;

  @Column({nullable : true})
  dateTime: Date;

  @Column({ nullable: true })
  description: string;
}
