import { config } from "dotenv";
config()
export const PORT=process.env.PORT
export const URL_DB=process.env.URL_DB
export const JWT_SECRET=process.env.JWT_SECRET
export const URL_REDIS=process.env.URL_REDIS
export const REFRESH_TOKEN_SECRET=process.env.REFRESH_TOKEN_SECRET
export const ALLOW_ORIGIN=process.env.ALLOW_ORIGIN.split(",")||[]
export const ENCRYPTION_KEY=process.env.ENCRYPTION_KEY
export const EMAIL=process.env.EMAIL
export const PASSWORD=process.env.PASSWORD
export const SALTROUND=process.env.SALTROUND