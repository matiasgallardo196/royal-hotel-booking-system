import { DataSource } from "typeorm";
import { DB, HOST, PASSDB, PORTDB, USERNAMEDB } from "./envs";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import { Appointment } from "../entities/Appointment";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: HOST,
    port: PORTDB,
    username: USERNAMEDB,
    password: PASSDB,
    database: DB,
    synchronize: true,
    dropSchema: false,
    logging: false,
    entities: [User,Credential,Appointment],
    subscribers: [],
    migrations: [],
})

