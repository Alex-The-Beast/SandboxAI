import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverConfig.js";
export const isAuthenticated=async(req,res,next)=>{
    try{
        const token=req.cookies?.token;
        if(!token) return res.status(401).json({ error: "No token provided." });
        const decodedToken=jwt.verify(token,JWT_SECRET);
        req.user=decodedToken;
        next();

    }catch(error){
        console.log("Error in auth middleware", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

}