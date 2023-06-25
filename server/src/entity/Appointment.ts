 import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { Payment } from "./Payment";
import { LinkPayment } from "./LinkPayment";
import { Treatments } from "./Treatments";
import { Clinics } from "./Clinics";
import { Doctors } from "./Doctors";
import { User } from "./User";

 export enum Status {
    Cancelled = "cancelled",
    Completed = "completed",
    Scheduled = "scheduled",
}

@Entity()
export class Appointment {

    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User,user => user.appointments)
    user: User;
  
    @ManyToOne(() => Doctors,doctor => doctor.appointments)
    doctor: Doctors;
  
    @ManyToOne(() => Clinics,clinics => clinics.appointments)
    clinic: Clinics;
  
    @ManyToOne(() => Treatments,treatments => treatments.appointments)
    treatment: Treatments;
  
    @Column()
    dateTime: Date;

    @OneToOne(() => Payment,payment => payment.appointment, { nullable: true })
    @JoinColumn({ name: 'paymentId' })
    payment: Payment;
  
    @OneToOne(() => LinkPayment,{ nullable: true })
    @JoinColumn({ name: 'linkPaymentId' })
    linkPayment: LinkPayment;

    @Column({
        type: "enum",
        enum: Status,
    })
    status: Status;
    


}
