import { DataSource } from "typeorm";
import { DATABASE_URL, DB, HOST, PASSDB, PORTDB, USERNAMEDB } from "./envs";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import { Appointment } from "../entities/Appointment";

const isProduction = DATABASE_URL;

export const AppDataSource = new DataSource({
  type: "postgres",
  ...(isProduction
    ? {
        url: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        host: HOST,
        port: PORTDB,
        username: USERNAMEDB,
        password: PASSDB,
        database: DB,
      }),
  synchronize: true,
  dropSchema: false,
  logging: false,
  entities: [User, Credential, Appointment],
  subscribers: [],
  migrations: [],
});
