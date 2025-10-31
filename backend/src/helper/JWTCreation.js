import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverConfig.js";

export const createToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "10d" });
};
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.log("Error in verify token", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
