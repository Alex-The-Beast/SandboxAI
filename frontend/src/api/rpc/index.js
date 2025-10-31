import {
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,

} from "@solana/web3.js";
import { connection } from "../../config/rpcConfig.js";
import { toast } from "react-toastify";


export const sendSol = async ({
  connected,
  connect,
  sendTransaction,
  fromAddress,
  toAddress,
  amount,
}) => {
  try {
    // --- Validate inputs ---
    if (!sendTransaction) return toast.error("❌ Wallet not connected.");
    if (!fromAddress || !toAddress)
      return toast.error("❌ Sender or recipient address missing.");
    if (!amount || isNaN(amount) || amount <= 0)
      return toast.error("⚠️ Invalid SOL amount.");
    if (!connected) await connect();

    const fromPubkey = new PublicKey(fromAddress);
    const toPubkey = new PublicKey(toAddress);
    if (fromPubkey.equals(toPubkey))
      return toast.error("⚠️ Sender and receiver cannot be the same.");

    // --- Check balance ---
    const balance = await connection.getBalance(fromPubkey);
    const lamportsToSend = Math.floor(amount * LAMPORTS_PER_SOL);
    const feeBuffer = 5000; // safety buffer

    if (balance < lamportsToSend + feeBuffer)
      return toast.error(
        `💸 Insufficient balance. You have ${(
          balance / LAMPORTS_PER_SOL
        ).toFixed(5)} SOL`
      );

    // --- Build transaction ---
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey,
        toPubkey,
        lamports: lamportsToSend,
      })
    );

    // --- Send transaction ---
    const signature = await sendTransaction(transaction, connection);

    // --- Fire-and-forget toast ---
    toast.success("🚀 Transaction completed!");
    console.log("📝 Transaction signature:", signature);

    return signature;
  } catch (error) {
    console.error("❌ sendSol Error:", error);
    if (error.message.includes("rejected"))
      toast.error("🚫 Transaction rejected by wallet.");
    else toast.error("❌ Something went wrong while sending SOL.");
  }
};

