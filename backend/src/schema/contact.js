import mongoose from "mongoose";
const { Schema } = mongoose;
const contactSchema = new Schema(
  {
    ownerWallet: {
      type: String,
      required: true,
      index: true,
    },
    walletAddress: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim:true
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
//prevent duplicate contact per user
contactSchema.index({ ownerWallet: 1, walletAddress: 1 }, { unique: true });

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
