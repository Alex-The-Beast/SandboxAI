import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiSearch } from "react-icons/fi";
import React from "react";
export default function TokenSelectModal({
  isOpen,
  onClose,
  onSelect,
  selectedToken,
}) {
  const tokens = [
    {
      name: "USDC",
      symbol: "USDC",
      address: "0x078D...7AD6",
      logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    },
    {
      name: "Unichain ETH",
      symbol: "ETH",
      address: "0x1234...abcd",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    },
    {
      name: "Wrapped Bitcoin",
      symbol: "WBTC",
      address: "0x5555...2B9c",
      logo: "https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png",
    },
    {
      name: "Solana",
      symbol: "SOL",
      address: "0xbdE8...aB97",
      logo: "https://cryptologos.cc/logos/solana-sol-logo.png",
    },
    {
      name: "Hyperliquid",
      symbol: "HYPE",
      address: "0x15D0...f68d",
      logo: "https://cryptologos.cc/logos/aptos-apt-logo.png",
    },
  ];

  const [query, setQuery] = React.useState("");

  const filteredTokens = tokens.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.symbol.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-[#151515] w-[420px] rounded-2xl shadow-xl border border-[#2A2A2A] p-4"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">
                Select a token
              </h2>
              <FiX
                onClick={onClose}
                className="text-gray-400 text-xl cursor-pointer hover:text-white"
              />
            </div>

            {/* Search Bar */}
            <div className="relative mb-4">
              <FiSearch className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tokens"
                className="w-full bg-[#1E1E1E] text-sm text-white rounded-xl py-2.5 pl-10 pr-3 outline-none border border-[#2B2B2B]"
              />
            </div>

            {/* Token List */}
            <div className="overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-[#333]">
              <h3 className="text-gray-400 text-xs mb-2 ml-1">
                Tokens by 24H volume
              </h3>
              {filteredTokens.map((token, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => {
                    onSelect(token);
                    onClose();
                  }}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-[#222] ${
                    selectedToken?.symbol === token.symbol
                      ? "bg-[#222]"
                      : "bg-transparent"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={token.logo}
                      alt={token.symbol}
                      className="w-7 h-7 rounded-full"
                    />
                    <div>
                      <p className="text-white text-sm font-medium">
                        {token.name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {token.symbol} {token.address}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
