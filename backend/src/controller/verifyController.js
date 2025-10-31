import User from "../schema/user.js";
import bs58 from "bs58";
import nacl from "tweetnacl";
import { createToken, verifyToken } from "../helper/JWTCreation.js";
import Agent from "../schema/agent.js";

export const verifyController = async (req, res) => {
  try {
    console.log(req.body);
    const { walletAddress, signature } = req.body;
    const user = await User.findOne({ walletAddress });
    if (!user) return res.status(400).json({ error: "User not found" });

    // const EXPIRY_NONCE = 3 * 60 * 1000; //3min
    // if (Date.now() - user.createdAt > EXPIRY_NONCE) {
    //   return res.status(400).json({ error: "Nonce Expired" });
    // }

    const message = new TextEncoder().encode(user.nonce);
    // const signatureUint8 = new Uint8Array(signature);
    const signatureUint8 = bs58.decode(signature);
    const publicKeyUint8 = bs58.decode(walletAddress);
    console.log(
      "message->",
      message,
      "signatureUint8->",
      signatureUint8,
      "publicKeyUint8->",
      publicKeyUint8
    );
    const isValid = nacl.sign.detached.verify(
      message,
      signatureUint8,
      publicKeyUint8
    );
    if (!isValid) return res.status(400).json({ error: "Invalid Signature" });
    user.nonce = null;
    user.createdAt = null;
    await user.save();
    const token = createToken({
      walletAddress: user.walletAddress,
      id: user._id,
    });
    //store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      //   secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    let agent = await Agent.findOne({ userId: user._id });
    if (!agent) {
      await Agent.create({
        userId: user._id,
        walletAddress: user.walletAddress,
      });
      console.log("Agent created successfuly", agent.name);
    } else {
      console.log("Agent already exist", agent.name);
    }
    res.status(200).json({
      success: true,
      message: "wallet verified successfully",
      token,
      user: {
        id: user._id,
        walletAddress: user.walletAddress,
      },
      agent: {
        id: agent._id,
        name: agent.name,
      },
    });
  } catch (error) {
    console.log("error in verify controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const cookieController = async (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: "No token provided." });
  try {
    const response = verifyToken(token);
    return res.status(200).json({ user: response.walletAddress });
  } catch (error) {
    console.log("Error in cookie controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logoutController = async (req, res) => {
  try {
    res.clearCookie("token");
    // Return a success flag, not just message
    return res
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Error in logout controller:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
export const updateController = async (req, res) => {
  try {
    console.log(req.body);
    const { name, image } = req.body;
    const { walletAddress } = req.user;
    const user = await User.findOne({ walletAddress });
    if (!user) return res.status(400).json({ error: "User not found" });
    user.name = name;
    user.image = image;
    await user.save();
    console.log(user+"from user");
    return res.status(200).json({
      success: true,
      id: user._id,
      message: "Profile updated successfully",
      name: user.name,
      image: user.image,
      walletAddress: user.walletAddress,
    });
  } catch (error) {
    console.log("Error in update controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProfileController = async (req, res) => {
  try {
    const { walletAddress } = req.user;
    const user = await User.findOne({ walletAddress });
    if (!user) return res.status(400).json({ error: "User not found" });
    return res.status(200).json({
      success: true,
      name: user.name,
      image: user.image,
      walletAddress: user.walletAddress,
      id: user._id,
    });
  } catch (error) {
    console.log("Error in get profile controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
