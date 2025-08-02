import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class Credential {
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true,nullable: false})
    username:string

    @Column({select:false,nullable: false})
    password: string
}



