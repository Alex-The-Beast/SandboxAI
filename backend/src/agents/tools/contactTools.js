// /agent/tools/contactTools.js
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import Contact from "../../schema/contact.js";

import { connection } from "../../config/web3Connection.js";
import { jupAxios } from "../../config/jupConfig.js";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import PendingTx from "../../schema/pendingTrx.js";
import { v4 as uuidv4 } from "uuid";

// ✅ Tool: Add contact
export const addContactTool = tool(
  async ({ name, walletAddress }, config) => {
    const ownerWallet = config?.configurable?.walletAddress;

    if (!ownerWallet || !name || !walletAddress)
      throw new Error("ownerWallet, name and walletAddress are required");

    const newContact = await Contact.create({
      ownerWallet,
      name,
      walletAddress,
    });

    return `✅ Contact '${name}' added successfully with address ${walletAddress}.`;
  },
  {
    name: "add_contact",
    description: "Add a new  contact to user's list",
    schema: z.object({
      name: z.string().describe("Name of the contact to add"),
      walletAddress: z.string().describe("Wallet address of the contact"),
    }),
  }
);

// ✅ Tool: Get all contacts
export const getContactsTool = tool(
  async (_, config) => {
    const walletAddress = config?.configurable?.walletAddress; // from contactAgent.invoke()
    const contacts = await Contact.find({ ownerWallet: walletAddress });
    if (!contacts.length) return "No contacts found.";
    return contacts.map((c) => `${c.name}: ${c.walletAddress}`).join("\n");
  },
  {
    name: "get_contacts",
    description: "Fetch all saved contacts for a given user wallet",
    schema: z.object({}),
  }
);

export const getSolBalanceTool = tool(
  async (_, config) => {
    const walletAddress = config?.configurable?.walletAddress;
    if (!walletAddress) throw new Error("walletAddress is required");
    try {
      const pubkey = new PublicKey(walletAddress);
      const balanceLamports = await connection.getBalance(pubkey);
      const balanceSOL = balanceLamports / LAMPORTS_PER_SOL;
      return `💰 Balance for wallet ${walletAddress} is ${balanceSOL.toFixed(
        4
      )} SOL`;
    } catch (err) {
      console.error("Error in getSolBalanceTool:", err);
      throw new Error(
        "Failed to fetch balance. Check if wallet address is valid."
      );
    }
  },
  {
    name: "get_sol_balance",
    description:
      "Fetch current SOL balance for a given wallet address using Solana RPC",
    schema: z.object({}),
  }
);



export const tokenListTool = tool(
  async ({ limit }) => {
    try {
      const response = await jupAxios.get("/tokens/v2/toptraded/24h", {
        params: { limit: limit || 30 },
      });
      const tokens = response.data.tokens || response.data;
      return tokens
        .map((t, i) => `${i + 1}. ${t.name} (${t.symbol}) — ${t.mint}`)
        .join("\n");
    } catch (err) {
      console.error("Error in tokenListTool:", err);
      throw new Error("Unable to fetch top-traded tokens from Jupiter API.");
    }
  },
  {
    name: "list_tokens",
    description: "Fetch the top traded tokens on Solana via Jupiter API",
    schema: z.object({
      limit: z
        .number()
        .optional()
        .describe("Number of tokens to return (default 30)"),
    }),
  }
);

export const searchTokenTool = tool(
  async ({ query }) => {
    if (!query || query.trim().length === 0)
      throw new Error("Token search query is required.");
    try {
      const response = await jupAxios.get("/tokens/v2/search", {
        params: { query: query.trim() },
      });
      const tokens = response.data || [];
      if (!tokens.length) return `No tokens found for "${query}".`;
      return tokens
        .slice(0, 10)
        .map((t, i) => `${i + 1}. ${t.name} (${t.symbol}) — ${t.mint}`)
        .join("\n");
    } catch (err) {
      console.error("Error in searchTokenTool:", err);
      throw new Error("Failed to search token from Jupiter API.");
    }
  },
  {
    name: "search_token",
    description: "Search a Solana token by name or symbol via Jupiter API",
    schema: z.object({
      query: z.string().describe("Token name or symbol to search for"),
    }),
  }
);

export const getQuoteTool = tool(
  async ({ inputMint, outputMint, amount, taker }) => {
    try {
      const response = await jupAxios.get("/ultra/v1/order", {
        params: { inputMint, outputMint, amount, taker },
      });

      const data = response.data;
      return `📊 Swap Quote:
From: ${inputMint}
To: ${outputMint}
Amount: ${amount}
Estimated Output: ${data?.outAmount || "N/A"}
Request ID: ${data?.requestId || "N/A"}`;
    } catch (err) {
      console.error("Error in getQuoteTool:", err);
      throw new Error(
        "Failed to fetch swap quote. Please check token mints and amount."
      );
    }
  },
  {
    name: "get_quote",
    description:
      "Fetch a swap quote using Jupiter API (simulated, no real swap)",
    schema: z.object({
      inputMint: z
        .string()
        .describe("Mint address of the input token (e.g. SOL)"),
      outputMint: z
        .string()
        .describe("Mint address of the output token (e.g. USDC)"),
      amount: z.number().describe("Amount of input token to swap"),
      taker: z
        .string()
        .optional()
        .describe("Wallet address requesting the quote"),
    }),
  }
);

export const sendSolTool = tool(
  async ({ to, amount }, config) => {
    // 0. Auth: ensure agent invoked with logged-in wallet in configurable
    const callerWallet = config?.configurable?.walletAddress;
    const userId = config?.configurable?.userId; // optional: your app user id
    if (!callerWallet) throw new Error("Unauthorized: missing wallet context (walletAddress).");

    // 1. Validate params
    if (!to || typeof to !== "string") throw new Error("Destination 'to' public key required.");
    if (typeof amount !== "number" || isNaN(amount) || amount <= 0) throw new Error("Invalid 'amount' (must be a positive number).");

    let toPub, payerPub;
    try {
      toPub = new PublicKey(to);
    } catch (err) {
      throw new Error("Invalid destination public key: " + err.message);
    }
    try {
      payerPub = new PublicKey(callerWallet);
    } catch (err) {
      throw new Error("Invalid caller wallet address in session: " + err.message);
    }

    // 2. Compute lamports and ensure wallet has balance
    const lamports = Math.floor(amount * LAMPORTS_PER_SOL);
    const payerBalance = await connection.getBalance(payerPub).catch(e => { throw new Error("RPC error when fetching balance: "+e.message); });

    // conservative fee buffer: 0.01 SOL
    const feeBufferLamports = Math.ceil(LAMPORTS_PER_SOL * 0.01);
    if (payerBalance < lamports + feeBufferLamports) {
      const need = ((lamports + feeBufferLamports) / LAMPORTS_PER_SOL).toFixed(6);
      const have = (payerBalance / LAMPORTS_PER_SOL).toFixed(6);
      throw new Error(`Insufficient funds: need ~${need} SOL (amount + fee buffer). Your wallet has ${have} SOL.`);
    }

    // 3. Build transfer instruction + transaction
    const transferIx = SystemProgram.transfer({
      fromPubkey: payerPub,
      toPubkey: toPub,
      lamports,
    });

    const tx = new Transaction();
    tx.add(transferIx);
    tx.feePayer = payerPub;

    // attach recent blockhash
    const { blockhash } = await connection.getLatestBlockhash().catch(e => { throw new Error("Failed to fetch recent blockhash: "+e.message); });
    tx.recentBlockhash = blockhash;

    // 4. Serialize unsigned transaction to send to frontend
    // Use serialize with requireAllSignatures=false so serialization succeeds without signatures
    const unsignedBytes = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });
    const unsignedBase64 = Buffer.from(unsignedBytes).toString("base64");

    // 5. Create pending tx record to prevent duplicates & for verification later
    const requestId = uuidv4();
    await PendingTx.create({
      requestId,
      userId: userId || "unknown",
      walletAddress: callerWallet,
      to,
      amount,
      lamports,
      unsignedTxBase64: unsignedBase64,
      status: "pending",
    });

    // 6. Return to frontend (agent will pass to UI)
    return {
      success: true,
      requestId,
      unsignedBase64,
      feePayer: callerWallet,
      amount,
      to,
      note: "Frontend must sign the transaction with the wallet and then call /api/tx/confirm with the txid.",
    };
  },
  {
    name: "send_sol_prepare",
    description: "Prepare an unsigned SOL transfer and store pending request. Frontend must sign and submit.",
    schema: z.object({
      to: z.string().describe("Recipient public key (base58)"),
      amount: z.number().describe("Amount in SOL"),
    }),
  }
);
