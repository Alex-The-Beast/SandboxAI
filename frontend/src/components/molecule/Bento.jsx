import { motion } from "framer-motion";
import {
  FiDownload,
  FiSend,
  FiRepeat,
  FiTrendingUp,
  FiLink2,
  FiUserPlus,
  FiUsers,
  FiCpu,
} from "react-icons/fi";



/* ---------------------------
   Feature Data
----------------------------*/
const features = [
  {
    title: "Effortless Actions",
    desc: "AI-driven blockchain operations with one prompt.",
    icon: <FiDownload />,
    className: "col-span-2 row-span-1",
  },
  {
    title: "12K+ Users",
    desc: "Trusted by builders & innovators worldwide.",
    icon: <FiUsers />,
    className: "col-span-1 row-span-1",
  },
  {
    title: "Send Tokens",
    desc: "Transfer SOL or SPL instantly by name or address.",
    icon: <FiSend />,
    className: "col-span-1 row-span-2",
  },
  {
    title: "Swap",
    desc: "Jupiter api picks the best route for your DEX swap.",
    icon: <FiRepeat />,
    className: "col-span-1 row-span-1",
  },
  {
    title: "Stake",
    desc: "Smart staking with validator optimization.",
    icon: <FiTrendingUp />,
    className: "col-span-1 row-span-1",
  },
  {
    title: "Bridge",
    desc: "Move assets cross-chain seamlessly.",
    icon: <FiLink2 />,
    className: "col-span-2 row-span-1",
  },
  {
    title: "Contacts",
    desc: "Send funds using saved names, not long addresses.",
    icon: <FiUserPlus />,
    className: "col-span-1 row-span-1",
  },
  {
    title: "TPS Monitor",
    desc: "Track Solana’s live transactions per second.Currently we are fetching data from jupiter api and give accurate data.",
    icon: <FiCpu />,
    className: "col-span-2 row-span-1",
  },
];

/* ---------------------------
   Bento Grid Component
----------------------------*/
export default function Bento() {
  return (
    <section className="relative w-full min-h-screen bg-black text-white py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-start mb-16">
          <h2 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-100 to-gray-400 text-transparent bg-clip-text">
            Sandbox AI Agent
          </h2>
          <p className="text-gray-400 mt-4 text-lg max-w-2xl ">
            Your intelligent Web3 companion for seamless blockchain operations. Our AI agent is your gateway to a world of limitless possibilities.
            You can <span className="text-blue-500/80 font-semibold">send swap stake bridge</span> and much more just by one prompt.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-4 auto-rows-[180px] gap-6">
          {/* Left Column */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="col-span-2 row-span-1 bg-gradient-to-br from-[#111] to-[#262525] rounded-3xl border border-gray-800 p-6 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-600/20 via-transparent to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition" />
            <div className="flex items-center justify-between">
              <FiDownload className="text-3xl text-gray-400" />
         
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Effortless Actions</h3>
              <p className="text-gray-400 text-sm">
                AI-driven blockchain operations with one prompt.
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-3xl border border-gray-800 p-6 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-600/20 via-transparent to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition " />
            <div className="flex items-center justify-between">
              <FiUsers className="text-3xl text-gray-400" />
  
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Fetch Balance</h3>
              <p className="text-gray-400 text-sm">
                Fetch your wallet balance with ease.
              </p>
            </div>
          </motion.div>



          {/* Right Column */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="col-span-1 row-span-2 bg-gradient-to-br from-[#101010] to-[#1a1a1a] rounded-3xl border border-gray-800 p-6 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-600/20 via-transparent to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition" />
            <div className="flex items-center justify-between">
              <FiSend className="text-3xl text-gray-400" />
       
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Send Tokens</h3>
              <p className="text-gray-400 text-sm w-[95%]">
                Instant transfers by listed address or name.You have to just tell the name to our agent it will generate you unsigned trx and ask you sign via connected wallet then execute safely.
              </p>
            </div>
          </motion.div>

          {/* Bottom Cards */}
          {features
            .slice(3, 8)
            .sort((a, b) => (a.title === "TPS Monitor" ? -1 : 0)) // 👈 moves TPS Monitor first in slice
            .map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className={`relative ${
                  f.title === "TPS Monitor"
                    ? "col-span-1 row-span-2 col-start-1" // 👈 forces it into 3rd column
                    : f.className
                } overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-[#101010] to-[#181818] hover:border-blue-700/80 group transition-all duration-500 p-6 flex flex-col justify-between`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                  <div className="absolute inset-0 bg-gradient-to-tr from-gray-500/20 via-transparent to-transparent blur-2xl" />
                </div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="text-3xl text-gray-400">{f.icon}</div>
          
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{f.title}</h3>
                  <p className="text-gray-400 text-sm">{f.desc}</p>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
