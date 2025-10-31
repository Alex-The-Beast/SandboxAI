// // Swap.jsx
// import { useState, useEffect, use } from "react";
// import { motion } from "framer-motion";
// import { FiUser, FiSettings, FiRepeat } from "react-icons/fi";
// import { FaChevronDown } from "react-icons/fa";
// import { getOrder, tokenList, searchToken } from "../api/jupyter";

// export default function Swap() {
//   const [sellAmount, setSellAmount] = useState("20.60");
//   const [buyAmount, setBuyAmount] = useState("3936.26");
//   const [tokenArray, setTokenArray] = useState(null);
//   const [tokenName, setTokenName] = useState(null);
//   const [searchTokenNameList, setSearchTokenNameList] = useState(null);

//   const order = async () => {
//     try {
//       const res = await getOrder({
//         inputMint: "So11111111111111111111111111111111111111112", // SOL
//         outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
//         amount: "1000000", // 0.1 SOL
//         taker: "DVhBgDBgzRdecS8TVVYhxi5oaLCCFfeS1sZWzZyBjas9",
//       });
//       console.log(res);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getToken = async () => {
//     try {
//       const res = await tokenList();
//       setTokenArray(res);
//       console.log(res);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const searchTokenName = async () => {
//     try {
//       console.log(tokenName + "from swap");
//       //print bonk from swap
//       const res = await searchToken(tokenName);
//       console.log(res);
//       setSearchTokenNameList(res);
//       return res;
//     } catch (Error) {
//       console.log(Error + "error in search token function");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0E0E0E] flex justify-center items-center text-white">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="bg-[#1A1A1A] w-[380px] md:w-[400px] rounded-3xl shadow-xl border border-[#2A2A2A] p-6 relative"
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <FiUser className="text-gray-400 text-xl cursor-pointer" />
//           <div className="bg-[#121212] flex rounded-full p-1 space-x-2">
//             {["Swap", "Limit", "Buy"].map((tab, idx) => (
//               <motion.button
//                 key={idx}
//                 whileTap={{ scale: 0.95 }}
//                 className={`px-4 py-1 rounded-full text-sm font-medium transition ${
//                   tab === "Swap"
//                     ? "bg-[#2A2A2A] text-white"
//                     : "text-gray-400 hover:text-white"
//                 }`}
//               >
//                 {tab}
//               </motion.button>
//             ))}
//           </div>
//           <FiSettings className="text-gray-400 text-xl cursor-pointer" />
//         </div>

//         {/* Swap Card */}
//         <div className="bg-[#141414] rounded-2xl p-4  space-y-2 border border-[#2B2B2B]">
//           <div className="flex justify-between text-sm text-gray-400">
//             <span>Sell</span>
//             <button className="text-[#D18B42] font-semibold">Max</button>
//           </div>

//           <div className="flex justify-between items-center">
//             <input
//               value={sellAmount}
//               onChange={(e) => setSellAmount(e.target.value)}
//               className="bg-transparent text-3xl font-semibold w-1/2 outline-none"
//             />
//             <div className="flex items-center space-x-2 bg-[#1E1E1E] px-3 py-1.5 rounded-xl">
//               <img
//                 src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
//                 alt="SOL"
//                 className="w-5 h-5"
//               />
//               <span className="text-white text-sm font-medium">SOL</span>
//               <FaChevronDown className="text-gray-500 text-xs" />
//             </div>
//           </div>

//           <p className="text-gray-500 text-xs">
//             ${(sellAmount * 191).toFixed(2)}
//           </p>
//         </div>

//         {/* Middle Arrow */}
//         <div className="flex justify-center -mt-5 ">
//           <motion.div
//             whileTap={{ rotate: 180 }}
//             className="bg-[#1E1E1E] w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border border-[#2B2B2B]"
//           >
//             <FiRepeat className="text-gray-300 text-lg" />
//           </motion.div>
//         </div>

//         {/* Buy Card */}
//         <div className="bg-[#141414] rounded-2xl p-4 -mt-3 mb-6 space-y-2 border border-[#2B2B2B]">
//           <div className="flex justify-between text-sm text-gray-400">
//             <span>Buy</span>
//             <span className="text-gray-500 text-xs">Available $90,530.40</span>
//           </div>

//           <div className="flex justify-between items-center">
//             <input
//               value={buyAmount}
//               onChange={(e) => setBuyAmount(e.target.value)}
//               className="bg-transparent text-3xl font-semibold w-1/2 outline-none"
//               disabled={true}
//             />
//             <div className="flex items-center space-x-2 bg-[#1E1E1E] px-3 py-1.5 rounded-xl">
//               <img src="/aboutLarge.avif" alt="USDC" className="w-5 h-5" />
//               <span className="text-white text-sm font-medium">USDC</span>
//               <FaChevronDown className="text-gray-500 text-xs" />
//             </div>
//           </div>

//           <p className="text-gray-500 text-xs">${buyAmount}</p>
//         </div>

//         {/* Swap Button */}
//         <motion.button
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.97 }}
//           className="w-full bg-gray-300/10 hover:bg-black/40 transition font-semibold py-3 rounded-2xl text-center text-lg"
//         >
//           SWAP
//         </motion.button>

//         {/* Footer rate info */}
//         <div className="text-center text-gray-500 text-xs mt-4">
//           1 SOL = 190.42 USDC
//         </div>
//       </motion.div>
//       <button
//         onClick={order}
//         className="cursor-pointer bg-gray-800/90 ml-4 rounded-lg px-4 py-2"
//       >
//         {" "}
//         Do order{" "}
//       </button>
//       <button
//         onClick={getToken}
//         className="cursor-pointer bg-gray-800/90 ml-4 rounded-lg px-4 py-2"
//       >
//         {" "}
//         Get Token List{" "}
//       </button>
//       {tokenArray != null && (
//         <div className="text-white max-w-3xl flex flex-col">
//           {tokenArray.map((token) => (
//             <div className="flex flex-col">
//               {token.name},
//               <img src={token.icon} className="size-5" alt="" />
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="flex flex-col gap-2 ml-4">
//         <div>Search by token name</div>
//         <input
//           type="text"
//           placeholder="write token name"
//           value={tokenName}
//           onChange={(e) => setTokenName(e.target.value)}
//           className="bg-black/80 border border-white/20 text-white p-2 rounded placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-blue-500"
//         />
//         <button
//           className="rounded-xl px-4 py-2 bg-gray-800/80 cursor-pointer"
//           onClick={searchTokenName}
//         >
//           Search
//         </button>
//         <div>
//           {searchTokenNameList && (
//             <div className="flex flex-col text-white">
//               {" "}
//               {searchTokenNameList.map((token) => (
//                 <div>{token.name},<img src={token.icon}  className ="size-5" alt="" /></div>
//               ))}

//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useContext, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSettings, FiRepeat } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import { getOrder, tokenList, searchToken, executeOrder } from "../api/jupyter";
import { useWallet } from "../hooks/contextHooks/useWalletHook.js";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { VersionedTransaction } from "@solana/web3.js";
import { toast } from "react-toastify";

export default function Swap({ walletAddress }) {
  const [sellAmount, setSellAmount] = useState(null);
  const [buyAmount, setBuyAmount] = useState(null);
  const [tokenArray, setTokenArray] = useState([]);
  const [selectedSellToken, setSelectedSellToken] = useState();
  const [selectedBuyToken, setSelectedBuyToken] = useState(null);

  const [showSellModal, setShowSellModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [customSlippage, setCustomSlippage] = useState("");
  const [showSlippagePopup, setShowSlippagePopup] = useState(false);
  const [slippage, setSlippage] = useState("0.5");
  const [searchTerm, setSearchTerm] = useState("");
  const { balance } = useWallet();
  const { user } = useContext(UserContext);
  const [shortAdd, setShortAdd] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [orderResponseTransaction, setOrderResponseTransaction] = useState("");
  const [sendRequestId, setSendRequestId] = useState(null);

  const shortenAddress = (addr) =>
    addr ? setShortAdd(addr.slice(0, 6) + "..." + addr.slice(-6)) : "";
  // Load token list on mount
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const res = await tokenList();
        console.log(res);
        setTokenArray(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTokens();
    shortenAddress(user.walletAddress);
  }, []);

  // Calculate Buy Amount whenever Sell amount or selected tokens change
  useEffect(() => {
    const fetchBuyAmount = async () => {
      if (!selectedSellToken || !selectedBuyToken || !sellAmount) return;
      console.log(selectedBuyToken, selectedSellToken);
      console.log(selectedSellToken.id, selectedBuyToken.id + "from fetch ");
      try {
        const res = await getOrder({
          inputMint: selectedSellToken.id,
          outputMint: selectedBuyToken.id,
          amount: (parseFloat(sellAmount) * 1e9).toString(), // Convert to lamports if SOL
          taker: user.walletAddress,
        });
        setBuyAmount((res?.outAmount / 1e6).toFixed(2)); // adjust decimals
        setOrderResponseTransaction(res?.transaction || null);
        setSendRequestId(res?.requestId);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBuyAmount();
  }, [sellAmount, selectedSellToken, selectedBuyToken]);

  useEffect(() => {
    const fetchSearchTokens = async () => {
      if (!searchTerm.trim()) {
        // Empty search → show full list
        const res = await tokenList();
        setTokenArray(res);
        return;
      }
      try {
        const res = await searchToken(searchTerm.trim());
        console.log("Search results:", res);
        setTokenArray(res);
      } catch (error) {
        console.log("Error fetching search results:", error);
      }
    };

    // Debounce API calls slightly (wait 400ms after typing)
    const timeout = setTimeout(fetchSearchTokens, 200);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const handleSlippageSelect = (val) => {
    setSlippage(val);
    setCustomSlippage("");
  };

  const safeSignTransaction = (transactionBase64, wallet) => {
    try {
      if (!transactionBase64 || transactionBase64 === "") {
        console.warn("No transaction available to sign. Skipping.");
        toast.error("No transaction available to sign. Skipping.", {
          position: "top-right",
          autoClose: 3000,
        });
        return null; // Return null if transaction is missing
      }

      const transaction = VersionedTransaction.deserialize(
        Buffer.from(transactionBase64, "base64")
      );
      transaction.sign([wallet]);

      const signedTransaction = Buffer.from(transaction.serialize()).toString(
        "base64"
      );
      return signedTransaction;
    } catch (error) {
      console.error("Error signing transaction:", error);
      toast.error("Error signing transaction", {
        position: "top-right",
        autoClose: 3000,
      });
      return null;
    }
  };

  const handleSwap = async () => {
    if (!orderResponseTransaction || !sendRequestId) {
      return toast.error("Missing transaction or request ID.");
    }

    // Sign transaction safely
    const signedTransaction = safeSignTransaction(
      orderResponseTransaction,
      wallet
    );

    if (!signedTransaction) {
      return toast.error("Cannot sign transaction. Please try again.");
    }

    try {
      const res = await executeOrder({
        signedTransaction,
        requestId: sendRequestId,
      });
      console.log("Swap executed:", res);
      toast.success("Swap executed successfully", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Swap failed:", err);
      toast.error("Swap failed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="max-h-screen">
      <nav className="w-full">
        <div className="flex justify-between items-center h-16 px-6 max-w-6xl mx-auto mt-4 relative">
          {/* Logo */}
          <Link to="/">
            <div className="text-3xl font-semibold tracking-tight text-white">
              *Sandbox
            </div>
          </Link>

          {/* Center Nav Links */}
          <div className="flex space-x-8 bg-white/5 rounded-2xl px-4 py-2 items-center backdrop-blur-md">
            <Link to="/chat">
              <div className="text-white hover:text-gray-300 transition">
                Agent
              </div>
            </Link>
            <Link to="/dashboard">
              <div className="text-white hover:text-gray-300 transition">
                Dashboard
              </div>
            </Link>
          </div>

          {/* Wallet Address + Dropdown */}
          {/* Wallet & Dropdown Wrapper */}
          <div
            className="relative inline-block"
            onMouseEnter={() => setOpenDropdown(true)}
            onMouseLeave={() => setOpenDropdown(false)}
          >
            {/* Wallet Button */}
            <div className="text-white cursor-pointer select-none bg-white/5 px-4 py-2 rounded-xl hover:bg-white/10 transition">
              {shortAdd || "Connect Wallet"}
            </div>

            {/* Dropdown */}
            <AnimatePresence>
              {openDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-[110%] bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg w-64 p-3 z-50"
                >
                  <div className="p-2 rounded-lg hover:bg-white/10 transition">
                    <div className="font-semibold text-white">Balance</div>
                    <div className="text-sm text-gray-400">
                      {balance ?? 0} SOL
                    </div>
                  </div>
                  <div className="p-2 rounded-lg hover:bg-white/10 transition">
                    <div className="font-semibold text-white">Name</div>
                    <div className="text-sm text-gray-400">
                      {name || "Anonymous"}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      <div className=" relative top-15 flex justify-center  text-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#1A1A1A] w-[380px] md:w-[400px] rounded-3xl shadow-xl border border-[#2A2A2A] p-6 relative"
        >
          {/* Header */}
          <div className="flex justify-between items-center  mb-4">
            <div className="bg-[#121212]/70 flex rounded-md p-1 space-x-2 px-4 ">
              Swap
            </div>
            <div className="relative mr-4">
              <button
                onClick={() => setShowSlippagePopup(!showSlippagePopup)}
                className="flex items-center gap-4 text-sm text-gray-300 hover:text-white transition cursor-pointer"
              >
                <span>{slippage}%</span>
                <FiSettings className="w-4 h-4" />
              </button>

              {showSlippagePopup && (
                <div className="absolute -right-20 mt-3 bg-[#1C1C1C] border border-[#2B2B2B] rounded-xl w-[280px] p-3 shadow-lg z-50">
                  <p className="text-gray-300 font-medium text-sm mb-2">
                    Slippage Tolerance
                  </p>
                  <div className="flex gap-2 mb-3">
                    {["0.3", "0.5", "1"].map((val) => (
                      <button
                        key={val}
                        onClick={() => handleSlippageSelect(val)}
                        className={`px-3 py-1  rounded-lg text-sm ${
                          slippage === val
                            ? "bg-[#D18B42] text-black font-semibold"
                            : "bg-[#1A1A1A] text-gray-300 hover:bg-[#2B2B2B]"
                        }`}
                      >
                        {val}%
                      </button>
                    ))}
                    <input
                      type="number"
                      placeholder="Custom"
                      value={customSlippage}
                      onChange={(e) => setCustomSlippage(e.target.value)}
                      onFocus={() => setSlippage("")}
                      className="w-[80px] text-center bg-[#1A1A1A] text-gray-300 rounded-lg outline-none border border-[#2B2B2B]  px-2"
                    />
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => setShowSlippagePopup(false)}
                      className="text-gray-400 text-sm hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (customSlippage) setSlippage(customSlippage);
                        setShowSlippagePopup(false);
                      }}
                      className="text-[#D18B42] font-semibold text-sm cursor-pointer"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* <FiSettings className="text-gray-400 text-xl cursor-pointer" /> */}
          </div>

          {/* Swap Card */}
          <div className="bg-[#141414] rounded-2xl p-4  space-y-2 border border-[#2B2B2B]">
            {/* Sell */}
            <div className="flex justify-between text-sm text-gray-400">
              <span>Sell</span>
              <button
                className="text-[#D18B42] font-semibold cursor-pointer"
                onClick={() => setSellAmount(balance)}
              >
                Max
              </button>
            </div>

            <div className="flex justify-between items-center">
              <input
                type="number"
                value={sellAmount}
                placeholder="0"
                onChange={(e) => setSellAmount(e.target.value)}
                className="bg-transparent text-3xl font-semibold w-1/2 outline-none"
              />
              <div
                className="flex items-center space-x-2 bg-[#1E1E1E] px-3 py-1.5 rounded-xl cursor-pointer relative border-1 border-gray-500"
                onClick={() => setShowSellModal(true)}
              >
                {selectedSellToken ? (
                  <>
                    <img
                      src={selectedSellToken.icon}
                      alt={selectedSellToken.symbol}
                      className="w-5 h-5"
                    />
                    <span className="text-white text-sm font-medium">
                      {selectedSellToken.symbol}
                    </span>
                  </>
                ) : (
                  <span>Select</span>
                )}
                <FaChevronDown className="text-gray-500 text-xs" />
              </div>
            </div>

            <p className="text-gray-500 text-xs">
              ${selectedSellToken ? (sellAmount * 191).toFixed(2) : 0}
            </p>
          </div>

          {/* Middle Arrow */}
          <div className="flex justify-center -mt-5 ">
            <motion.div
              whileTap={{ rotate: 180 }}
              className="bg-[#1E1E1E] w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border border-[#2B2B2B]"
              onClick={() => {
                const temp = selectedSellToken;
                setSelectedSellToken(selectedBuyToken);
                setSelectedBuyToken(temp);
                setBuyAmount(sellAmount);
              }}
            >
              <FiRepeat className="text-gray-300 text-lg" />
            </motion.div>
          </div>

          {/* Buy Card */}
          <div className="bg-[#252525] rounded-2xl p-4 -mt-3 mb-6 space-y-2 border border-[#2B2B2B]">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Buy</span>
              <span className="text-gray-500 text-xs">
                Available $90,530.40
              </span>
            </div>

            <div className="flex justify-between items-center">
              <input
                placeholder="0"
                value={buyAmount}
                className="bg-transparent text-3xl font-semibold w-1/2 outline-none"
                disabled
              />
              <div
                className="flex items-center space-x-2 bg-[#1E1E1E] px-3 py-1.5 rounded-xl cursor-pointer relative border-1 border-gray-500"
                onClick={() => setShowBuyModal(true)}
              >
                {selectedBuyToken ? (
                  <>
                    <img
                      src={selectedBuyToken.icon}
                      alt={selectedBuyToken.symbol}
                      className="w-5 h-5"
                    />
                    <span className="text-white text-sm font-medium">
                      {selectedBuyToken.symbol}
                    </span>
                  </>
                ) : (
                  <span>Select</span>
                )}
                <FaChevronDown className="text-gray-500 text-xs" />
              </div>
            </div>

            <p className="text-gray-500 text-xs">${buyAmount}</p>
          </div>

          {/* Swap Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-gray-300/10   hover:bg-black/40 transition font-semibold py-3 rounded-2xl text-center text-lg cursor-pointer"
            onClick={handleSwap}
          >
            SWAP
          </motion.button>

          {/* Footer rate info */}
          <div className="text-center text-gray-500 text-xs mt-4">
            {selectedSellToken && selectedBuyToken
              ? `1 ${selectedSellToken.symbol} ≈ ${(
                  buyAmount / sellAmount
                ).toFixed(2)} ${selectedBuyToken.symbol}`
              : "Select tokens to see rate"}
          </div>
        </motion.div>

        {/* Token Selection Modal */}

        {(showSellModal || showBuyModal) && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-[#121212]/90 border border-[#2B2B2B] rounded-2xl w-[400px] max-h-[80vh] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-[#2B2B2B]">
                <h2 className="text-white font-semibold text-lg tracking-wide">
                  {showSellModal
                    ? "Select Token to Sell"
                    : "Select Token to Buy"}
                </h2>
                <button
                  onClick={() => {
                    setShowSellModal(false);
                    setShowBuyModal(false);
                    setSearchTerm("");
                  }}
                  className="text-gray-400 hover:text-white transition cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Search Bar */}
              <div className="p-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search name or paste address"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-2.5 pl-4 pr-10 rounded-xl bg-[#1A1A1A] text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#D18B42]/60 transition"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                    />
                  </svg>
                </div>
              </div>

              <div className="px-5 pb-2" id="24hr">
                <p className="text-gray-300 font-semibold flex items-center gap-2">
                  <span className="text-lg">🔥</span>
                  <span>Top 24 hr Trending Tokens</span>
                </p>
              </div>

              {/* Token List */}
              <div className="overflow-y-auto scrollbar-hide px-2 pb-2">
                {tokenArray.length > 0 ? (
                  tokenArray.map((token) => (
                    <div
                      key={token.address}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-[#1E1E1E]/90 cursor-pointer transition"
                      onClick={() => {
                        if (showSellModal) setSelectedSellToken(token);
                        if (showBuyModal) setSelectedBuyToken(token);
                        setShowSellModal(false);
                        setShowBuyModal(false);
                        setSearchTerm("");
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={token.icon}
                          alt={token.symbol}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="text-white font-medium text-sm">
                            {token.symbol}
                          </p>
                          <p className="text-gray-400 text-xs">{token.name}</p>
                        </div>
                      </div>
                      <span className="text-gray-400 text-xs font-semibold">
                        {token.priceUsd
                          ? `$${Number(token.priceUsd).toFixed(2)}`
                          : ""}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400 py-8 text-sm">
                    No tokens found
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
