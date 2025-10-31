// models/PendingTx.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const pendingTxSchema = new Schema(
  {
    requestId: { type: String, required: true, unique: true },
    userId: { type: String, required: true }, // your app user id
    walletAddress: { type: String, required: true }, // payer
    to: { type: String, required: true },
    amount: { type: Number, required: true }, // SOL units
    lamports: { type: Number, required: true },
    unsignedTxBase64: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "sent", "confirmed", "failed", "cancelled"],
      default: "pending",
    },
    txid: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
const PendingTx = mongoose.model("PendingTx", pendingTxSchema);
export default PendingTx;
