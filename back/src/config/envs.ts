import "dotenv/config"

export const PORT=process.env.PORT
export const HOST=process.env.HOST
export const PORTDB=Number(process.env.PORTDB)
export const USERNAMEDB=process.env.USERNAMEDB
export const PASSDB=process.env.PASSDB
export const DB=process.env.DB
export const SALT_ROUNDS=process.env.SALT_ROUNDS
export const JWT_SECRET=process.env.JWT_SECRET
export const ENVIRONMENT = process.env.ENVIRONMENT === "development" 
export const SENDGRID_API_KEY= process.env.SENDGRID_API_KEY
export const EMAIL_FROM=process.env.EMAIL_FROM