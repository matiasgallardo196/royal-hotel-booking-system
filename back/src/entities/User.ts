import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Credential } from "./Credential"
import { Appointment } from "./Appointment"


@Entity( {name: "users"})
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column({length:100,nullable: false })
    name:string

    @Column({unique:true,nullable: false })
    email:string

    @Column({type:"date",nullable: false })
    birthdate:Date

    @Column({type:"integer",nullable: false })
    nDni:number
    
    @Column({ type: 'text', nullable: true })
    file:string|null


    @OneToOne(()=>Credential,{ cascade: true, onDelete: "CASCADE" })
    @JoinColumn()
    credentials: Credential

    @OneToMany(() => Appointment, (appointment) => appointment.user,{ cascade: true })
    appointments: Appointment[];
}




