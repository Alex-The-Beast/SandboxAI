import axios from "axios";
import { JUP_API_KEY,JUP_URL } from "./serverConfig.js";

export const jupAxios = axios.create({
  baseURL:JUP_URL, // e.g., https://quote-api.jup.ag/v6
  headers: {
    "Content-Type": "application/json",
    "x-api-key":JUP_API_KEY, // optional (if you have one)
  },
});