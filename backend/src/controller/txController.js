// controllers/txController.js
import PendingTx from "../schema/pendingTrx.js";
import { connection } from "../config/web3Connection.js";

export const confirmTx = async (req, res) => {
  try {
    const { requestId, txid } = req.body;
    if (!requestId || !txid) return res.status(400).json({ error: "requestId and txid required" });

    const pending = await PendingTx.findOne({ requestId });
    if (!pending) return res.status(404).json({ error: "Pending request not found" });
    if (pending.status !== "pending") return res.status(400).json({ error: "Request not pending" });

    // verify on-chain
    const sigInfo = await connection.getSignatureStatus(txid, { searchTransactionHistory: true });
    const status = sigInfo?.value?.err ? "failed" : "confirmed";

    // better: fetchTransaction or getTransaction to inspect logs, confirmations
    // const txDetails = await connection.getTransaction(txid);

    pending.status = status;
    pending.txid = txid;
    pending.updatedAt = new Date();
    await pending.save();

    return res.json({ success: true, status });
  } catch (err) {
    console.error("confirmTx error:", err);
    return res.status(500).json({ error: err.message });
  }
};
