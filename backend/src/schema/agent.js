import mongoose from "mongoose"
const {Schema} =mongoose
const AgentSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },
    name:{
      type:String,
      default:"K9"
    },
    walletAddress:{
        type:String,
        required:true
    },
    model:{
        type:String,
        default:"Gemini 2.5"
    },
    context:{
        type:Object
    },
},{timestamps:true})
const Agent=mongoose.model("Agent",AgentSchema)
export default Agent;