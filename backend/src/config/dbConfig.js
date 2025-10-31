import mongoose from "mongoose";
import { DB_URL } from "./serverConfig.js";

export default async function connectDB(){
    try{
       await mongoose.connect(DB_URL);
        console.log("DB is connected")
    }
    catch(error){
        console.log(error,"Error in db connection")
    }

}