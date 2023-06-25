import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany} from "typeorm";
import { Doctors } from "./Doctors";
import { Appointment } from "./Appointment";
import { LinkPayment } from "./LinkPayment";
import { Payment } from "./Payment";
@Entity()
export class Treatments {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;
    
    @Column()
    price: string;
    
    @ManyToMany(() => Doctors, doctor => doctor.treatments)
    doctors: Doctors[];

    @OneToMany(() => Appointment, (appointment) => appointment.treatment)
    appointments: Appointment[];

    @OneToMany(() => LinkPayment, (linkPayment) => linkPayment.treatment)
    linkPayment: LinkPayment[];

    @OneToMany(() => Payment, payment => payment.treatment)
    payment: Payment[];
}
