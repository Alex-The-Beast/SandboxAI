import mongoose from "mongoose";
const { Schema } = mongoose;
const channelSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index:true
    },
    ownerWallet: {
      type: String,
      index: true,
      required: true,
    },
    name: {
      type: String,
      trim:true
    },
    agentId:{
       type:Schema.Types.ObjectId,
       ref:"Agent",
       required:true
       
    },
    lastMessage:{
       type:String,
       default:""
    }
  },
  { timestamps: true }
);
const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
