import { Connection } from "@solana/web3.js";
import { SOL_URL } from "./serverConfig.js";
export const connection = new Connection(SOL_URL, "confirmed");
