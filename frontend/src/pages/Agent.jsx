// Agent.jsx
import { useEffect, useState, useRef } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, LAMPORTS_PER_SOL, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import { useNavigate } from "react-router-dom";
import { GoogleGenAI } from "@google/genai";

/* ---------------------------
  Icons (same as your original)
----------------------------*/
const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor"/>
  </svg>
);
const WalletIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z" fill="currentColor"/>
  </svg>
);
const DisconnectIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="currentColor"/>
  </svg>
);
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
  </svg>
);
const BotIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5V7H9V5.5L3 7V9L5 9.5V15.5L3 16V18L9 16.5V15.5L15 16.5V18L21 16V14L19 15.5V9.5L21 9ZM15 13.5H9V9.5H15V13.5Z" fill="currentColor"/>
  </svg>
);

/* ---------------------------
  Config / Constants
----------------------------*/
const SOLANA_RPC = "https://solana-devnet.g.alchemy.com/v2/DLxc8Y4rL9WqiNaU4JsCS";
const DEFAULT_CONTACTS = {
  Alex: "8JrQobHXDhpmASr9G2SgHFsg5d8ZaML6jQbhUBtMLBzk",
  Bob: "9vF7H3X8JdR5q8KLM9nqT7BZP4wE2Y6C1A3D8F2H9J",
  Charlie: "7xY5KpQ8rT3M2N1B4V6C9Z0X8W2E5R1T6Y7U3I9O0P",
};

const STORAGE_KEYS = {
  CHATS: "agent_chats_v1",
  CONTACTS: "agent_contacts_v1",
  FILES: "agent_files_v1",
  RECENTS: "agent_recents_v1",
  TXS: "agent_txs_v1",
};

/* ---------------------------
  Gemini setup (uses env key)
----------------------------*/
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

/* ---------------------------
  Helper storage utils (localStorage JSON)
----------------------------*/
const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.error("load error", e);
    return fallback;
  }
};
const save = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error("save error", e);
  }
};

/* ---------------------------
  Component
----------------------------*/
export default function Agent() {
  const { connected, publicKey, disconnect, sendTransaction } = useWallet();
  const navigate = useNavigate();
  const connection = useRef(new Connection(SOLANA_RPC));
  const [balance, setBalance] = useState(0);

  const [contacts, setContacts] = useState(() => load(STORAGE_KEYS.CONTACTS, DEFAULT_CONTACTS));
  const [chats, setChats] = useState(() => load(STORAGE_KEYS.CHATS, { "Default": [{ role: "system", text: "Hello! I'm your Solana AI assistant. Ask me anything or send SOL to contacts like Alex." }] }));
  const [currentChat, setCurrentChat] = useState("Default");
  const [messages, setMessages] = useState(chats["Default"] || []);
  const [recents, setRecents] = useState(() => load(STORAGE_KEYS.RECENTS, ["Default"]));
  const [files, setFiles] = useState(() => load(STORAGE_KEYS.FILES, {}));
  const [txHistory, setTxHistory] = useState(() => load(STORAGE_KEYS.TXS, []));
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, isLoading]);

  // keep messages synced when chat changes
  useEffect(() => {
    setMessages(chats[currentChat] || []);
  }, [chats, currentChat]);

  // persist storage on changes
  useEffect(() => save(STORAGE_KEYS.CHATS, chats), [chats]);
  useEffect(() => save(STORAGE_KEYS.CONTACTS, contacts), [contacts]);
  useEffect(() => save(STORAGE_KEYS.FILES, files), [files]);
  useEffect(() => save(STORAGE_KEYS.RECENTS, recents), [recents]);
  useEffect(() => save(STORAGE_KEYS.TXS, txHistory), [txHistory]);

  // balance poll when connected
  useEffect(() => {
    if (!connected || !publicKey) { setBalance(0); return; }
    let cancelled = false;
    const conn = connection.current;
    const fetchBal = async () => {
      try {
        const l = await conn.getBalance(publicKey);
        if (!cancelled) setBalance(l / LAMPORTS_PER_SOL);
      } catch (err) { console.error(err); }
    };
    fetchBal();
    const id = setInterval(fetchBal, 15000);
    return () => { cancelled = true; clearInterval(id); };
  }, [connected, publicKey]);

  /* ---------------------------
     Message helpers
  ----------------------------*/
  const addMessage = (role, text) => {
    // update chats state immutably
    setChats(prev => {
      const copy = { ...prev };
      copy[currentChat] = [...(copy[currentChat] || []), { role, text, timestamp: Date.now() }];
      return copy;
    });
    setMessages(prev => [...prev, { role, text, timestamp: Date.now() }]);
    setRecents(prev => {
      const next = [currentChat, ...prev.filter(x => x !== currentChat)].slice(0, 30);
      return next;
    });
  };

  /* ---------------------------
     Contact functions
  ----------------------------*/
  const addContact = (name, address) => {
    setContacts(prev => ({ ...prev, [name]: address }));
    addMessage("system", `✅ Contact added: ${name} → ${address}`);
  };
  const listContacts = () => {
    addMessage("system", `📇 Contacts: ${Object.entries(contacts).map(([n,a]) => `${n}(${a.slice(0,6)}...)`).join(", ")}`);
    return contacts;
  };
  const findContact = (query) => {
    const q = query.toLowerCase();
    const found = Object.entries(contacts).filter(([n,a]) => n.toLowerCase().includes(q) || a.toLowerCase().includes(q));
    addMessage("system", `🔎 Found: ${found.map(f => f[0]).join(", ") || "None"}`);
    return found;
  };
  const deleteContact = (nameOrAddr) => {
    const key = Object.keys(contacts).find(k => k === nameOrAddr || contacts[k] === nameOrAddr);
    if (!key) { addMessage("system", `❌ Contact not found: ${nameOrAddr}`); return false; }
    setContacts(prev => { const n = { ...prev }; delete n[key]; return n; });
    addMessage("system", `🗑️ Deleted contact ${key}`);
    return true;
  };

  /* ---------------------------
     File system (local JSON save/load)
  ----------------------------*/
  const saveChatFile = (fileName) => {
    setFiles(prev => ({ ...prev, [fileName]: { chatId: currentChat, messages: chats[currentChat], savedAt: Date.now() } }));
    addMessage("system", `💾 Saved current chat as file "${fileName}"`);
  };
  const loadChatFile = (fileName) => {
    const f = files[fileName];
    if (!f) { addMessage("system", `❌ File not found: ${fileName}`); return; }
    const id = `${fileName}-${Date.now()}`;
    setChats(prev => ({ ...prev, [id]: f.messages || [] }));
    setCurrentChat(id);
    addMessage("system", `📂 Loaded file "${fileName}" into chat ${id}`);
  };
  const exportChat = (chatId = currentChat) => {
    const payload = { id: chatId, messages: chats[chatId] || [], exportedAt: Date.now() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `chat-${chatId}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addMessage("system", `📤 Exported chat ${chatId}`);
  };
  const importChat = async (file) => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const id = `import-${Date.now()}`;
      setChats(prev => ({ ...prev, [id]: parsed.messages || parsed.chats || [] }));
      setCurrentChat(id);
      addMessage("system", `📥 Imported chat into ${id}`);
    } catch (err) {
      addMessage("system", `❌ Import failed: ${err.message}`);
    }
  };

  /* ---------------------------
     Solana: balance, TPS, send, tx history
  ----------------------------*/
  const checkBalance = async (pubkeyOrContact) => {
    try {
      const resolved = contacts[pubkeyOrContact] || pubkeyOrContact;
      const pk = new PublicKey(resolved);
      const lamports = await connection.current.getBalance(pk);
      const sol = lamports / LAMPORTS_PER_SOL;
      addMessage("system", `💰 Balance of ${pk.toBase58().slice(0,6)}...: ${sol.toFixed(6)} SOL`);
      return sol;
    } catch (err) {
      addMessage("system", `❌ Balance check failed: ${err.message}`);
      return null;
    }
  };

  const getSolanaTPS = async () => {
    try {
      const samples = await connection.current.getRecentPerformanceSamples(5);
      if (!samples || samples.length === 0) {
        addMessage("system", "⚠️ Could not fetch performance samples");
        return null;
      }
      // Approximate seconds = numSlots * 0.4
      const approx = samples.map(s => ({ tx: s.numTransactions, secs: s.numSlots * 0.4 })).filter(s => s.secs > 0);
      const totalT = approx.reduce((a,b) => a + b.tx, 0);
      const totalS = approx.reduce((a,b) => a + b.secs, 0);
      const tps = totalT / Math.max(totalS, 1);
      addMessage("system", `📈 Solana TPS (approx): ${tps.toFixed(2)}`);
      return tps;
    } catch (err) {
      addMessage("system", `❌ TPS error: ${err.message}`);
      return null;
    }
  };

  const sendSol = async (recipientInput, amount) => {
    try {
      if (!connected || !publicKey) { addMessage("system", "❌ Wallet not connected"); return; }
      const recipientAddress = contacts[recipientInput] || recipientInput;
      const toPub = new PublicKey(recipientAddress);
      const lamports = Math.floor(amount * LAMPORTS_PER_SOL);

      const tx = new Transaction().add(SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: toPub,
        lamports,
      }));

      addMessage("system", `⏳ Sending ${amount} SOL to ${recipientInput} (${toPub.toBase58().slice(0,8)}...)`);
      const sig = await sendTransaction(tx, connection.current);
      // store tx in local tx history for quick link
      setTxHistory(prev => [{ sig, to: toPub.toBase58(), amount, ts: Date.now() }, ...prev].slice(0, 50));
      addMessage("system", `✅ Transaction submitted: https://explorer.solana.com/tx/${sig}?cluster=devnet`);
      // refresh balance
      const l = await connection.current.getBalance(publicKey);
      setBalance(l / LAMPORTS_PER_SOL);
      return sig;
    } catch (err) {
      addMessage("system", `❌ Send failed: ${err.message}`);
      return null;
    }
  };

  const viewTxHistory = () => {
    if (!txHistory || txHistory.length === 0) {
      addMessage("system", "📭 No transactions recorded in this session.");
      return;
    }
    addMessage("system", `📜 Recent txs:\n${txHistory.map(t => `${t.sig} → ${t.amount} SOL (to ${t.to.slice(0,8)}...)`).join("\n")}`);
  };

  /* ---------------------------
     Price fetch — Jupiter + CoinGecko fallback
     - Jupiter quote API often works on Mainnet; on devnet results may differ.
     - We'll try Jupiter first for SPL tokens (if provided mint), then CoinGecko for general prices.
  ----------------------------*/
  const COINGECKO_SIMPLE = async (id) => {
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(id)}&vs_currencies=usd`);
      const d = await res.json();
      return d[id]?.usd ?? null;
    } catch (e) { return null; }
  };

  // Known mapping (common devnet tokens may not have price data). For SOL, we use coingecko.
  const fetchTokenPrice = async (query) => {
    try {
      const q = query.trim().toLowerCase();
      if (q === "sol" || q === "solana") {
        const price = await COINGECKO_SIMPLE("solana");
        if (price == null) addMessage("system", "❌ Could not fetch SOL price.");
        else addMessage("system", `💱 SOL price: $${price}`);
        return price;
      }

      // Try CoinGecko symbol lookup (basic)
      // Fetch coin list (small overhead). In production you would cache this.
      const listRes = await fetch("https://api.coingecko.com/api/v3/coins/list");
      const list = await listRes.json();
      const found = list.find(c => c.symbol?.toLowerCase() === q || c.id?.toLowerCase() === q || c.name?.toLowerCase() === q);
      if (found) {
        const price = await COINGECKO_SIMPLE(found.id);
        if (price == null) addMessage("system", `❌ Price not available for ${found.id}`);
        else addMessage("system", `💱 ${found.name} (${found.symbol.toUpperCase()}) price: $${price}`);
        return price;
      }

      // If user provided an SPL mint (base58 length > 30), try Jupiter quote endpoint (may or may not work on devnet)
      if (q.length > 30) {
        try {
          // Jupiter quote API v4: (example) https://quote-api.jup.ag/v4/price?inputMint=<mint>&outputMint=<mint>&amount=<u64>
          // We'll attempt to quote to USDC (mainnet mint) — on devnet this may not exist. We try and fall back to coingecko.
          const USDC_MINT = "Ea9F..."; // NOTE: No guaranteed USDC on devnet — so this will likely fail on devnet.
          const url = `https://quote-api.jup.ag/v4/price?inputMint=${q}&outputMint=So11111111111111111111111111111111111111112&amount=1000000`;
          const res = await fetch(url);
          const json = await res.json();
          if (json && json.data) {
            // approximate price by checking price of 1e6 units used; interpret carefully
            addMessage("system", `💱 Jupiter response (devnet/mainnet dependent). See console for raw data.`);
            console.log("Jupiter price response", json);
            return json;
          }
        } catch (err) {
          console.warn("Jupiter failed", err);
        }
      }

      addMessage("system", `❌ Token not found via CoinGecko/Jupiter: ${query}`);
      return null;
    } catch (err) {
      addMessage("system", `❌ Price fetch error: ${err.message}`);
      return null;
    }
  };

  /* ---------------------------
     Gemini integration — intent parsing & fine-tuned prompt
     - We send a structured prompt that asks Gemini to return JSON with exactly one of:
       { "intent": "transfer", "recipient": "...", "amount": number }
       or { "intent": "price", "query": "SOL" }
       or { "intent":"tps" }
       or { "intent":"balance", "target":"..." }
       or { "intent":"contact_add", "name":"", "address":"" }
       or { "intent":"contact_find", "query":"" }
       or { "intent":"contact_list" }
       or { "intent":"contact_delete", "query":"" }
       or { "intent":"export_chat", "filename":"" }
       or { "intent":"unknown", "response": "friendly text" }
----------------------------*/
  const parseCommandWithGemini = async (commandText) => {
    try {
      const systemPrompt = `
You are a Solana assistant. Extract user's intent and structured arguments from the user's message.
Return ONLY a single JSON object (no extra commentary). The JSON must be one of these shapes:

1) Transfer:
{ "intent": "transfer", "recipient": "wallet_or_contact", "amount": number }

2) Price lookup:
{ "intent": "price", "query": "SOL or token name or coin symbol or mint" }

3) TPS:
{ "intent": "tps" }

4) Balance:
{ "intent": "balance", "target": "address_or_contact" }

5) Contact add:
{ "intent": "contact_add", "name": "Alice", "address": "base58_address" }
x(", ")}.
User message: "${commandText}"
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: systemPrompt,
      });

      // extract JSON object
      const txt = response.text || response.output?.[0]?.content?.[0]?.text || "";
      const jsonMatch = txt.match(/\{[\s\S]*\}/);
      const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { intent: "unknown", response: txt };
      return parsed;
    } catch (err) {
      console.error("gemini parse error", err);
      return { intent: "unknown", response: "Sorry, I couldn't parse that." };
    }
  };

  /* ---------------------------
     Top-level command handler that uses Gemini parse + executes functions
  ----------------------------*/
  const handleCommand = async (text) => {
    setIsLoading(true);
    try {
      addMessage("user", text);

      // Ask Gemini to parse into intent
      const parsed = await parseCommandWithGemini(text);
      // If Gemini returns structured response, act accordingly
      if (!parsed || !parsed.intent) {
        addMessage("system", "❌ Could not parse intent.");
        return;
      }

      switch (parsed.intent) {
        case "transfer": {
          const recipient = parsed.recipient;
          const amount = Number(parsed.amount);
          if (isNaN(amount) || amount <= 0) { addMessage("system", "❌ Invalid amount"); break; }
          if (amount > balance) { addMessage("system", `❌ Insufficient balance. You have ${balance.toFixed(4)} SOL`); break; }
          await sendSol(recipient, amount);
          break;
        }
        case "price": {
          await fetchTokenPrice(parsed.query || parsed.symbol || "SOL");
          break;
        }
        case "tps": {
          await getSolanaTPS();
          break;
        }
        case "balance": {
          await checkBalance(parsed.target || parsed.query || publicKey?.toBase58());
          break;
        }
        case "contact_add": {
          addContact(parsed.name, parsed.address);
          break;
        }
        case "contact_find": {
          findContact(parsed.query);
          break;
        }
        case "contact_list": {
          listContacts();
          break;
        }
        case "contact_delete": {
          deleteContact(parsed.query);
          break;
        }
        case "export_chat": {
          saveChatFile(parsed.filename || `export-${Date.now()}`);
          break;
        }
        case "txs": {
          viewTxHistory();
          break;
        }
        case "unknown":
        default: {
          // Gemini will give fallback response
          addMessage("assistant", parsed.response || "I can help with Solana tasks like send, price, balance, contacts, TPS, export.");
          break;
        }
      }
    } catch (err) {
      addMessage("system", `❌ Error processing command: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------------------
     UI handlers
  ----------------------------*/
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setInput("");
    await handleCommand(text);
  };

  const handleDisconnect = async () => {
    await disconnect();
    navigate("/");
  };

  // Quick create chat
  const createNewChat = () => {
    const id = `Chat-${Date.now()}`;
    setChats(prev => ({ ...prev, [id]: [{ role: "system", text: "New chat started." }] }));
    setCurrentChat(id);
  };

  const deleteChat = (id) => {
    setChats(prev => {
      const n = { ...prev };
      delete n[id];
      return n;
    });
    setCurrentChat("Default");
  };

  /* ---------------------------
     Render UI (tailwind classes same as your screenshot)
  ----------------------------*/
  return (
    <div className="flex h-screen bg-[#050d0d] text-white">
      {/* Sidebar */}
      <div className="w-64 bg-[#0a1616] border-r border-teal-400/20 flex flex-col">
        <div className="p-4 border-b border-teal-400/20">
          <button onClick={createNewChat} className="w-full px-4 py-3 bg-teal-500/10 border border-teal-400/30 rounded-lg text-teal-300 hover:bg-teal-500/20 transition text-left flex items-center gap-3">
            <WalletIcon /> <span>+ New Chat</span>
          </button>
        </div>

        <div className="flex-1 p-4 overflow-auto">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Recent Conversations</h3>
          {recents.map(id => (
            <div key={id} onClick={() => setCurrentChat(id)} className={`px-3 py-2 text-sm text-gray-300 hover:bg-teal-500/10 rounded-lg mb-1 cursor-pointer ${currentChat===id?"bg-teal-500/10":""}`}>
              {id}
            </div>
          ))}

          <h3 className="text-sm font-semibold text-gray-400 mt-4 mb-2">Contacts</h3>
          {Object.keys(contacts).map(name => (
            <div key={name} className="px-3 py-2 text-sm text-gray-300 hover:bg-teal-500/10 rounded-lg mb-1 cursor-pointer">{name}</div>
          ))}
        </div>

        <div className="p-4 border-t border-teal-400/20">
          <div className="flex items-center gap-3 px-3 py-2 bg-teal-500/10 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center"><UserIcon /></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-teal-300 truncate">{publicKey ? `${publicKey.toBase58().slice(0,6)}...${publicKey.toBase58().slice(-4)}` : "Wallet not connected"}</p>
              <p className="text-xs text-gray-400">{balance.toFixed(4)} SOL</p>
            </div>
          </div>
          <button onClick={handleDisconnect} className="w-full mt-3 px-4 py-2 text-red-300 hover:bg-red-500/20 rounded-lg transition flex items-center gap-2 justify-center">
            <DisconnectIcon /> Disconnect
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-teal-400/20 p-4 bg-[#0a1616]/50 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-teal-300">Solana AI Assistant</h1>
          <div className="bg-teal-500/10 px-3 py-1 rounded-full border border-teal-400/30">Balance: {balance.toFixed(4)} SOL</div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#050d0d] to-[#0a1616]">
          <div className="max-w-3xl mx-auto p-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-4 p-6 ${msg.role==="user"?"bg-teal-500/5 border-l-4 border-teal-400":"bg-transparent"}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role==="user"?"bg-teal-500/20":"bg-purple-500/20"}`}>{msg.role==="user"?<UserIcon/>:<BotIcon/>}</div>
                <div className="flex-1 min-w-0"><div className="whitespace-pre-wrap leading-relaxed text-gray-100">{msg.text}</div></div>
              </div>
            ))}
            {isLoading && <div className="flex gap-4 p-6"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center"><BotIcon/></div><div className="flex-1 flex gap-1"><div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div><div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay:"0.1s"}}></div><div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay:"0.2s"}}></div></div></div>}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-teal-400/20 p-4 bg-[#0a1616]/50">
          <div className="max-w-3xl mx-auto relative">
            <input
              type="text"
              placeholder='Ask anything or send 0.1 SOL to Alex...'
              className="w-full px-6 py-4 pr-12 bg-[#050d0d] border border-teal-400/30 rounded-xl focus:outline-none focus:border-teal-400 text-white placeholder-gray-400"
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              onKeyDown={(e)=>e.key==="Enter"&&!e.shiftKey&&handleSend()}
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading||!input.trim()} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-teal-300 hover:bg-teal-500/20 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"><SendIcon/></button>
            <p className="text-xs text-gray-400 text-center mt-3">Contacts: {Object.keys(contacts).join(", ")} • Example: "Send 0.1 SOL to Alex"</p>
          </div>
        </div>
      </div>
    </div>
  );
}
