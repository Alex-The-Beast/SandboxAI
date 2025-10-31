import express from "express";
import { connection } from "../config/web3Connection.js";
import { Transaction } from "@solana/web3.js";
import PendingTx from "../schema/pendingTrx.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
const router = express.Router();

// routes/solana.js
router.post("/sendRequest", isAuthenticated, async (req, res) => {
  const { from, to, amount } = req.body;

  // Call your sendSolTool or replicate logic
  if (!from || !to || !amount)
    return res.status(400).json({ message: "Missing params" });

  // you already do all this inside sendSolTool — skip here if tool used
  return res.json({ success: true });


});

router.post("/verifyTransaction", isAuthenticated, async (req, res) => {
    const { requestId, txid } = req.body;

  if (!requestId || !txid) return res.status(400).json({ message: "requestId and txid required" });

    const pending = await PendingTx.findOne({ requestId });
    if (!pending) return res.status(404).json({ message: "Pending tx not found" });

    const sigInfo = await connection.getSignatureStatus(txid, { searchTransactionHistory: true });
    const status = sigInfo?.value?.err ? "failed" : "confirmed";

    pending.status = status;
    pending.txid = txid;
    await pending.save();

    return res.json({ success: true, status });
});

export default router;
