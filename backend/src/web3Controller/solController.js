import { getSolBalance } from "../web3/getBalance.js";
import { PublicKey } from "@solana/web3.js";

export const getSolBalanceController = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    console.log(walletAddress);
    if (!walletAddress)
      return res.status(400).json({ error: "Wallet address is required" });
    const balance = await getSolBalance(walletAddress);
    return res.status(200).json({
      walletAddress: walletAddress,
      balance: balance,
      unit: "SOL",
    });
  } catch (error) {
    console.log(error, "Error in get sol balance controller");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getLastFiveTransactions = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const publicKey = new PublicKey(walletAddress);

    // Get latest 5 signatures
    const signatures = await connection.getSignaturesForAddress(publicKey, {
      limit: 5,
    });

    const txs = [];

    for (const sigInfo of signatures) {
      const tx = await connection.getTransaction(sigInfo.signature, {
        commitment: "confirmed",
        maxSupportedTransactionVersion: 0,
      });

      if (!tx) continue;

      txs.push({
        signature: sigInfo.signature,
        slot: tx.slot,
        blockTime: tx.blockTime
          ? new Date(tx.blockTime * 1000).toLocaleString()
          : "N/A",
        fee: tx.meta?.fee || 0,
        status: tx.meta?.err ? "Failed" : "Success",
        preBalances: tx.meta?.preBalances,
        postBalances: tx.meta?.postBalances,
      });
    }

    return txs;
  } catch (error) {
    console.error("Error fetching last 5 transactions:", error);
    throw error;
  }
};
