import { connection } from "../config/web3Connection.js"
import { PublicKey,LAMPORTS_PER_SOL } from "@solana/web3.js"
export const getSolBalance=async(walletAddress)=>{
    try{
        console.log(walletAddress +"from get sol balance ");
       const balance =await connection.getBalance(new PublicKey(walletAddress));
       const finalBalance=balance/LAMPORTS_PER_SOL;
       return finalBalance;

    }catch(error){
        console.log(error,"Error in get sol balance ");
        res.status(500).json({ error: "Internal Server Error" });
    }

    
}