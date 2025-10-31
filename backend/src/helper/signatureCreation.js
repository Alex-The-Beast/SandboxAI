import nacl from "tweetnacl";
import bs58 from "bs58";
import { PRIVATE_KEY } from "../config/serverConfig.js";

export const signatureCreation = async (req, res) => {
  try {
    console.log(req.body);
    const { nonce } = req.body;

    // Your Solana private key in base58 (for testing ONLY)
    // ⚠️ Never expose or hardcode in production
    const privKeyBase58 = PRIVATE_KEY;

    // Decode private key to Uint8Array
    const secretKeyUint8 = bs58.decode(privKeyBase58);

    // Encode message (nonce) to bytes
    const messageUint8 = new TextEncoder().encode(nonce);

    // Sign message
    const signatureUint8 = nacl.sign.detached(messageUint8, secretKeyUint8);
    console.log("test" + signatureUint8);
    // Encode signature to base58 for readable output
    const signatureBase58 = bs58.encode(signatureUint8);

    // console.log("Signature:", signatureBase58);

    res.status(200).json({ signature: signatureBase58 });
  } catch (err) {
    console.error("Error creating signature:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
