import { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Settings,
  Box,
  Database,
  Users,
  Send,
  Layers,
  Link2,
  Wallet,
  LogOutIcon,
  Menu,
  X,
} from "lucide-react";
import AddContactButton from "../components/atom/quickAction/AddContactButton";
import SendSolButton from "../components/atom/quickAction/SendSolButton";
import { useWallet } from "../hooks/contextHooks/useWalletHook.js";
import { UserContext } from "../context/UserContext";
import { useUserContextHook } from "../hooks/contextHooks/useUserContextHook.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const { balance, contacts } = useWallet();
  const { user } = useContext(UserContext);
  const { profile } = useUserContextHook();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [shortAdd, setShortAdd] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (user?.walletAddress) {
      setShortAdd(
        `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-6)}`
      );
    }
  }, [user]);

  const features = [
    { name: "Stake", icon: Layers, component: null },
    { name: "Bridge", icon: Link2, component: null },
    { name: "Send Crypto", icon: Send, component: SendSolButton },
    { name: "Add Contact", icon: Users, component: AddContactButton },
    { name: "Create NFT", icon: Layers, component: null },
    { name: "Create Token", icon: Database, component: null },
    { name: "Swap Coin", icon: Layers, component: null },
    { name: "Fetch Token Price", icon: Database, component: null },
    { name: "Solana TPS", icon: Database, component: null },
    { name: "Check Balance", icon: Layers, component: null },
  ];

  const integrations = [
    { name: "Helius", desc: "RPC & indexing for Solana" },
    { name: "Jupiter", desc: "Best swap routing on Solana" },
    { name: "Lido", desc: "Liquid staking protocol" },
    { name: "Metamask", desc: "Wallet connectivity" },
  ];

  return (
    <div className="min-h-screen bg-[#0b0e10] text-slate-300 font-sans overflow-hidden flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-[#0b0e10]/90 backdrop-blur-md border-white/5 relative top-12 left-0 z-50">
        <div className="flex justify-between items-center h-16 px-4 sm:px-8 max-w-7xl mx-auto">
          <Link to="/">
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-300">
              *Sandbox
            </div>
          </Link>

          <div className="hidden md:flex space-x-8 bg-white/5 rounded-2xl px-4 py-2 items-center">
            <Link
              to="/chat"
              className="text-gray-300 hover:text-gray-300 transition"
            >
              Agent
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-300 hover:text-gray-300 transition"
            >
              Dashboard
            </Link>
          </div>

          {/* Wallet */}
          <div
            className="relative inline-block"
            onMouseEnter={() => setOpenDropdown(true)}
            onMouseLeave={() => setOpenDropdown(false)}
          >
            <div className="text-gray-300 cursor-pointer select-none bg-white/5 px-4 py-2 rounded-xl hover:bg-white/10 transition text-sm sm:text-base">
              {shortAdd || "Connect Wallet"}
            </div>

            <AnimatePresence>
              {openDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-[110%] bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 rounded-md shadow-lg w-56 sm:w-48 p-3 z-50"
                >
                  <DropdownItem title="Balance" desc={`${balance ?? 0} SOL`} />
                  <DropdownItem
                    title="Name"
                    desc={profile?.name || "Anonymous"}
                  />
                  <div
                    className="p-2 hover:bg-white/10 transition flex items-center justify-between cursor-pointer border-t-1 border-white/10 mt-2"
                    onClick={() => toast.info("Logout clicked")}
                  >
                    <span className="text-gray-300">Logout</span>
                    <LogOutIcon className="size-4 text-slate-300" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              className="text-gray-300 bg-white/10 p-2 rounded-lg"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden flex flex-col bg-[#0b0e10]/95 border-t border-white/5"
            >
              <Link
                to="/chat"
                className="px-6 py-3 text-gray-300 hover:bg-white/10"
              >
                Agent
              </Link>
              <Link
                to="/dashboard"
                className="px-6 py-3 text-gray-300 hover:bg-white/10"
              >
                Dashboard
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main layout */}
      <div className="flex flex-1 pt-20 max-w-7xl mx-auto mt-8">
        {/* Sidebar */}
        <aside className="hidden md:flex w-74 bg-[#0f1113] border-r border-[#1a1c1f] flex-col justify-between h-[70vh] ">
          <div className="p-5">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-gray-300 font-bold">
                {profile?.name?.charAt(0) || "U"}
              </div>
              <div>
                <div className="text-gray-300 font-semibold truncate">
                  {profile?.name || "User"}
                </div>
              </div>
            </div>

            <nav className="space-y-2">
              <NavItem label="Overview" Icon={Home} active />
              <NavItem label="Settings" Icon={Settings} />
              <NavItem label="Integrations" Icon={Box} />
              <NavItem label="Background Agents" Icon={Database} />
              <div className="border-t border-white/5 my-4"></div>
              <NavItem label="Usage" Icon={Wallet} />
              <div className="border-t border-white/5 my-4"></div>
              <NavItem label="Docs" Icon={Send} />
              <NavItem label="Contact Us" Icon={Users} />
            </nav>
          </div>

          <div className="p-4 text-xs text-slate-500 border-t border-white/5">
            © 2025 Sandbox Dashboard
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Wallet Balance"
              value={balance}
              desc={user?.walletAddress}
            />
            <StatCard
              title="Total Contacts"
              value={contacts?.length || 0}
              desc="Saved wallet addresses"
            />
            <StatCard
              title="Recent Transactions"
              value="3"
              desc="Last 24 hours"
            />
          </div>

          <Section>
            <div className="flex flex-col items-center justify-center min-h-[10vh]">
              <div className="font-semibold text-md">Transaction Log</div>
              <div className="text-xs">
                <p>All your recent transactions will appear here</p>
              </div>
            </div>
          </Section>

          <Section title="Tools We Offer">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {features.map((feature, index) => {
                const FeatureComponent = feature.component;
                return FeatureComponent ? (
                  <FeatureComponent
                    key={index}
                    name={feature.name}
                    icon={feature.icon}
                  />
                ) : (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#111214] border border-white/5 hover:border-slate-600/40 transition cursor-pointer"
                  >
                    <feature.icon className="w-5 h-5 text-slate-200" />
                    <div className="text-sm text-slate-100">
                      {feature.name === "Swap Coin" ? (
                        <Link to="/dashboard/swap">Swap Coin</Link>
                      ) : (
                        feature.name
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </Section>

          <Section title="Integrations">
            <div className="space-y-3">
              {integrations.map((it, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 border-b border-white/8 hover:bg-white/5 hover:rounded-md transition"
                >
                  <div>
                    <div className="text-sm text-slate-100">{it.name}</div>
                    <div className="text-xs text-slate-400">{it.desc}</div>
                  </div>
                  <button className="px-3 py-1 text-sm rounded-md bg-slate-700/30 border border-slate-600/40 hover:bg-slate-600/40">
                    Manage
                  </button>
                </div>
              ))}
            </div>
          </Section>
        </main>
      </div>
    </div>
  );
}

/* Components */
function NavItem({ label, Icon, active }) {
  return (
    <motion.div
      whileHover={{ x: active ? 0 : 6 }}
      className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer ${
        active
          ? "bg-gradient-to-r from-slate-800/60 to-slate-800/30"
          : "hover:bg-white/5"
      }`}
    >
      <Icon
        className={`w-4 h-4 ${active ? "text-sky-400" : "text-slate-400"}`}
      />
      <div
        className={`text-sm ${
          active ? "text-gray-300 font-medium" : "text-gray-600 font-semibold"
        }`}
      >
        {label}
      </div>
    </motion.div>
  );
}

function StatCard({ title, value, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#121416] p-6 rounded-xl border border-[#1a1c1f] shadow-sm"
    >
      <div className="text-sm text-slate-400 mb-2">{title}</div>
      <div className="text-2xl text-gray-300 font-semibold truncate">
        {value}
      </div>
      <div className="text-xs font-semibold text-slate-500 mt-1 break-all">
        {desc}
      </div>
    </motion.div>
  );
}

function Section({ title, children }) {
  return (
    <section className="bg-[#0f1113] p-6 rounded-xl border border-[#1a1c1f] mb-8">
      <div className="font-semibold text-gray-300 mb-4">{title}</div>
      {children}
    </section>
  );
}

function DropdownItem({ title, desc }) {
  return (
    <div className="p-2 hover:bg-white/10 transition ">
      <div className="font-semibold text-gray-300 text-xs">{title}</div>
      <div className="text-gray-400 text-xs">{desc}</div>
    </div>
  );
}
