// src/components/chat/ChatLanding.jsx
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function ChatLanding({ profile, input, setInput, onSend }) {
  const prompts = [
    {
      title: "Swap 1 ETH to USDC",
      desc: "Instantly swap your ETH to USDC securely using Sandbox AI.",
    },
    {
      title: "Stake my 500 MATIC",
      desc: "Earn rewards by staking your MATIC through trusted protocols.",
    },
    {
      title: "Bridge 2 SOL to Ethereum",
      desc: "Move assets across chains seamlessly with our bridge feature.",
    },
    {
      title: "Check my wallet balance",
      desc: "Get real-time portfolio insights across all your connected wallets.",
    },
  ];

  return (
    <motion.div
      key="landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4 }}
      className="relative flex flex-col items-center justify-center w-full top-12"
    >
      {/* Top Tabs */}
      <div className="flex space-x-8 bg-white/5 rounded-2xl px-4 py-2 items-center backdrop-blur-md">
        <div className="text-gray-300 hover:text-gray-100 transition">Agent</div>
        <Link to="/dashboard">
          <div className="text-white/50">Dashboard</div>
        </Link>
      </div>

      {/* Greeting */}
      <main className="flex-1 flex flex-col justify-center items-start px-6 md:px-64 py-4 text-left">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-semibold mb-2"
        >
          Hi there,{" "}
          <span className="text-zinc-400">{profile?.name || "Sandbox User"}</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl md:text-4xl font-semibold text-zinc-200 mb-10"
        >
          What would you like to do?
        </motion.h2>

        <p className="text-zinc-400 mb-8 text-sm md:text-base max-w-3xl">
          Use one of the common crypto actions below or simply type your own
          request — Sandbox AI understands human language and executes safely.
        </p>

        {/* Prompt Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 w-full max-w-4xl">
          {prompts.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 w-full min-h-[150px] flex flex-col justify-between hover:border-zinc-600 transition"
            >
              <div>
                <h3 className="text-zinc-100 font-medium mb-2 text-base md:text-lg">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-snug">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Box */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 w-full max-w-4xl flex items-center gap-3">
          <input
            type="text"
            placeholder="Ask whatever you want..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent flex-1 outline-none text-zinc-300 text-sm md:text-base px-3"
          />
          <button
            onClick={onSend}
            className="bg-white text-black rounded-xl px-4 py-3 flex items-center gap-2 hover:bg-zinc-200 transition"
          >
            <FiSend />
          </button>
        </div>
      </main>
    </motion.div>
  );
}
