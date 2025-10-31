import mongoose from "mongoose";
import { Schema } from "mongoose";
const userSchema = new Schema(
  {
    name:{
      type: String,
    },
    image:{
      type: String,
    },
    walletAddress: {
      type: String,
      required: true,
      unique:true,
      index:true
    },
    nonce: {
      type: String,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
