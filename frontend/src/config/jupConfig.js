import axios from "axios";
export const jupAxios = axios.create({
  baseURL: import.meta.env.VITE_JUP_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_JUP_API_KEY, 
  },
});
