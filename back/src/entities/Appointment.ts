import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { AppointmentStatus } from "../interfaces/IAppointment"
import { User } from "./User"


@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"date"})
    date: string

    @Column({type:"time"})
    time: string

    @ManyToOne(() => User, (user) => user.appointments, { nullable: false, onDelete: "CASCADE" }) 
    @JoinColumn({ name: "userId" }) 
    user: User;

    @Column({type:"enum",enum:AppointmentStatus,default:AppointmentStatus.Active, nullable: false})
    status: AppointmentStatus
}


