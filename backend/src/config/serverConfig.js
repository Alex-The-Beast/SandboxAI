import dotenv from "dotenv";
dotenv.config();
export const PORT=process.env.PORT
export const DB_URL=process.env.MONGO_URI
export const PRIVATE_KEY=process.env.PRIVATE_KEY
export const JWT_SECRET=process.env.JWT_SECRET
export const SOL_URL=process.env.SOL_URL
export const JUP_API_KEY=process.env.JUP_API_KEY
export const JUP_URL=process.env.JUP_URL
