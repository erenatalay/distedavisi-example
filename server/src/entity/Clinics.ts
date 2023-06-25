import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Doctors } from "./Doctors";
import { Appointment } from "./Appointment";
import { LinkPayment } from "./LinkPayment";
import { Payment } from "./Payment";
@Entity()
export class Clinics {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;
    
    @Column()
    contactNumber: string;

    @Column({nullable : true})
    commissionRate: number;

    @OneToMany(() => Doctors, doctor => doctor.clinic)
    doctors: Doctors[];

    @OneToMany(() => Appointment, appointment => appointment.clinic)
    appointments: Appointment[];

    @OneToMany(() => LinkPayment, linkPayment => linkPayment.clinic)
    linkPayment: LinkPayment[];

    @OneToMany(() => Payment, payment => payment.clinic)
    payment: Payment[];

}
