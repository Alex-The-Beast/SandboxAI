// /agent/agent.js
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { MongoDBSaver } from "@langchain/langgraph-checkpoint-mongodb";
import {
  addContactTool,
  getContactsTool,
  getQuoteTool,
  getSolBalanceTool,
  
  searchTokenTool,
  sendSolTool,
  tokenListTool,
} from "./tools/contactTools.js";
import { SystemMessage } from "@langchain/core/messages";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
try {
  await client.db("sandbox").command({ ping: 1 });
  console.log("✅ MongoDB connected successfully to:", process.env.MONGO_URI);
} catch (error) {
  console.error("❌ MongoDB connection failed:", error);
}
const checkpointer = new MongoDBSaver({
  client,
  databaseName: "sandbox",
});

console.log("✅ MongoDB connected successfully to:", process.env.MONGO_URI);
console.log("✅ MongoDBSaver initialized:", {
  hasDb: !!checkpointer.client,
  db: client.db().databaseName,
  expectedCollection: "checkpoints (auto-created on first use)",
});



// ✅ Initialize Gemini model
const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-2.5-flash",
  temperature: 0,
  maxOutputTokens: 2048,
});

const systemMessage = new SystemMessage(`
You are Sandbox AI — a Web3 automation agent for Solana and EVM ecosystems.

### Core Capabilities
- Manage and retrieve wallet contacts.
- Fetch real-time token lists and prices using Jupiter API.
- Get token swap quotes and simulate swaps.
- Fetch wallet balances and simulate SOL transfers.
- Always explain clearly before performing any simulated financial action.

### Safety Rules
- Never ask for or expose private keys or seed phrases.
- Never perform on-chain transactions — only simulate or prepare data.
- If a transaction requires signing, clearly tell the user it must be done in their wallet UI.
- Always confirm user intent before swaps or sends.

### Tone & Style
- Professional yet friendly.
- Clear, structured, and concise.
- Use emojis to improve readability for financial actions (💰, 🔁, ✅, ⚠️).

You can use the following tools:
1. add_contact
2. get_contacts
3. get_sol_balance
4. send_sol
5. list_tokens
6. search_token
7. get_quote
8. execute_swap
`);

export const contactAgent = createReactAgent({
  llm: model,
  tools: [
    addContactTool,
    getContactsTool,
    getSolBalanceTool,
    
    tokenListTool,
    searchTokenTool,
    getQuoteTool,
    sendSolTool
  ],
  checkpointer: checkpointer,
  messageModifier: systemMessage,
});
