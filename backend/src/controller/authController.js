import User from "../schema/user.js";
import Agent from "../schema/agent.js";
import { randomBytes } from "crypto";
export const authController = async (req, res) => {
  try {
    console.log(req.body);
    const { walletAddress } = req.body;
    console.log(walletAddress);
    let user = await User.findOne({ walletAddress });

    const nonce = randomBytes(16).toString("hex");

    if (!user) {
      await User.create({ walletAddress, nonce });

      res.status(200).json({ nonce });
    } else {
      user.nonce = nonce;
      await user.save();
      res.status(200).json({ nonce });
    }

 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
