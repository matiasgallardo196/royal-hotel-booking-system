import { User } from "../entities/User"



export interface ILogin{
    login:boolean
    user:User|null
    token:string|null
}