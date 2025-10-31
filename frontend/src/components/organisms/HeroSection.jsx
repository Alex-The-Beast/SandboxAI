// // src/pages/Home.jsx
// import { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { useWalletModal } from "@solana/wallet-adapter-react-ui";

// export default function Home() {
//   const navigate = useNavigate();
//   const { connected, publicKey, disconnect } = useWallet();
//   const { setVisible } = useWalletModal();
//   const [openDropdown, setOpenDropdown] = useState(false);
//   const dropdownRef = useRef();

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpenDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLaunchClick = () => {
//     if (!connected) setVisible(true);
//     else navigate("/agent");
//   };

//   const handleWalletClick = () => {
//     if (!connected) setVisible(true);
//     else setOpenDropdown((prev) => !prev);
//   };

//   const handleCopyAddress = () => {
//     navigator.clipboard.writeText(publicKey.toBase58());
//     setOpenDropdown(false);
//     alert("Wallet address copied!");
//   };

//   const handleDisconnect = async () => {
//     await disconnect();
//     setOpenDropdown(false);
//   };

//   return (
//     <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white">


//       {/* Nav */}
//       <nav className="absolute top-8 w-full flex justify-between items-center px-10">
//         <div className="text-xl font-semibold tracking-wider flex items-center gap-2">
//           <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500" />
//           SANDBOX
//         </div>
//         <div className="flex gap-6 text-sm text-gray-300">
//           <button className="hover:text-teal-400 transition">Protocol</button>
//           <button className="hover:text-teal-400 transition">DAO</button>
//           <button className="hover:text-teal-400 transition">Association</button>
//           <button className="hover:text-teal-400 transition">Sandbox Token</button>
//         </div>

//         {/* Wallet */}
//         <div className="relative" ref={dropdownRef}>
//           <button
//             onClick={handleWalletClick}
//             className="px-4 py-2 rounded-lg text-teal-300 hover:bg-teal-500/10 transition"
//           >
//             {connected
//               ? `Connected: ${publicKey.toBase58().slice(0, 4)}...${publicKey
//                   .toBase58()
//                   .slice(-4)}`
//               : "Connect Wallet"}
//           </button>

//           {connected && openDropdown && (
//             <div className="absolute right-0 mt-2 w-44 bg-[#0a1616] border border-teal-400 rounded-lg shadow-lg z-50">
//               <button
//                 onClick={handleCopyAddress}
//                 className="w-full text-left px-4 py-2 hover:bg-teal-500/20 transition"
//               >
//                 Copy Address
//               </button>
//               <button
//                 onClick={handleDisconnect}
//                 className="w-full text-left px-4 py-2 hover:bg-red-500/20 transition"
//               >
//                 Disconnect
//               </button>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Hero Text */}
//       <motion.div
//         className="relative z-10 text-center px-4"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         <motion.h1
//           className="text-5xl md:text-6xl font-semibold text-teal-200"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3, duration: 1 }}
//         >
//           Sandbox Protocol
//         </motion.h1>

//         <p className="mt-4 text-gray-400 max-w-xl mx-auto text-base md:text-lg">
//           Your Gateway To Next-Gen Governance — Build And Steer DAOs With Powerful, Community-Driven Infrastructure.
//         </p>

//         <motion.button
//           onClick={handleLaunchClick}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.98 }}
//           className="cursor-pointer mt-8 px-6 py-3 bg-teal-500/10 border border-teal-400 rounded-xl text-indigo-300 font-medium hover:bg-teal-500/20 transition"
//         >
//           Launch App →
//         </motion.button>
//       </motion.div>


//     </section>
//   );
// }



import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative h-[60vh] w-full mt-24 bg-black text-white overflow-hidden flex flex-col items-center justify-center">
      {/* Background grid lines */}
   {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#d1d5db_1px,transparent_0)] bg-[length:80px_80px] opacity-40" /> */}


      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 text-center"
      >
        {/* <div className="mb-2">
          <span className="text-xs px-3 py-1 bg-blue-700 text-gray-100 rounded-full">
            ● sanbox
          </span>
        </div> */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-semibold leading-tight text-gray-300">
         Managing Crypto is as easier
          <br />
          as talking to a friend
        </h1>
        <p className="text-white/70 mt-6 text-sm md:text-base max-w-xl mx-auto">
          Send.&nbsp; Stake.&nbsp; Swap.&nbsp; bridge&nbsp; crypto — faster, easier, everywhere.
          <br />
         All operation via Sandbox agent.
        </p>

        <div className="mt-10 flex justify-center gap-4">
        <Link to ='/chat'>
          <button className="bg-indigo-800 text-gray-200 px-5 py-2 rounded-md font-semibold hover:bg-indigo-500/70 transition cursor-pointer">
            Try Our Agent →
          </button></Link>
      <Link to='/dashboard'>
          <button className="bg-white/10 border border-white/20 px-5 py-2 rounded-md hover:bg-white/20 transition cursor-pointer">
            View Tools
          </button></Link>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
