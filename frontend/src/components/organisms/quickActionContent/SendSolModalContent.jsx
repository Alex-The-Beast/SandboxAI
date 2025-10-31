import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useWallet } from "../../../hooks/contextHooks/useWalletHook.js";
import { useWallet as useWalletAdapter } from "@solana/wallet-adapter-react";

export const SendSolModalContent = ({ onClose }) => {
  const modalRef = useRef();
  const { sendTransaction,connected,connect } = useWalletAdapter();
  const { sendSol } = useWallet(); // your sendSol function from context

  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");

  const handleSend = async () => {
    if (!toAddress || !amount) {
      toast.info("Please enter a wallet address and amount.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      await sendSol({ connected,connect,sendTransaction,toAddress, amount: parseFloat(amount) });
 
      onClose();
    } catch (err) {
      console.error(err);
    
    }
  };

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="relative bg-black text-white p-6 rounded-2xl shadow-lg w-[90%] max-w-lg border border-gray-100/30"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 text-xl font-bold cursor-pointer"
        >
          ✕
        </button>

        <h2 className="mb-6 mt-2 text-xl font-semibold text-center">
          Send SOL
        </h2>

        {/* First Row: To Wallet Address */}
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm text-slate-400">To Wallet Address</label>
          <input
            type="text"
            placeholder="Enter recipient wallet address"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            className="bg-black/80 border border-white/20 text-white p-2 rounded placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Second Row: Amount & Send */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-400">Amount (SOL)</label>
          <input
            type="number"
            placeholder="Enter amount to send"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-black/80 border border-white/20 text-white p-2 rounded placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          <button
            onClick={handleSend}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded mt-4 transition cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};


// import { useState, useRef, useEffect } from "react";
// import { toast } from "react-toastify";
// import { useWallet } from "../../../hooks/contextHooks/useWalletHook.js";

// export const SendSolModalContent = ({ onClose }) => {
//   const modalRef = useRef();
//   const { sendSol, walletAddress } = useWallet();

//   const [toAddress, setToAddress] = useState("");
//   const [amount, setAmount] = useState("");

//   const handleSend = async () => {
//     if (!toAddress || !amount) {
//       toast.info("Please enter a wallet address and amount.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return;
//     }

//     try {
//       await sendSol({ toAddress, amount: parseFloat(amount) });
//       toast.success("Transaction sent successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       onClose();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to send SOL. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (modalRef.current && !modalRef.current.contains(event.target)) {
//         onClose();
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [onClose]);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
//       <div
//         ref={modalRef}
//         className="relative bg-black/60 border border-white/20 text-white p-8 rounded-3xl shadow-2xl w-[90%] max-w-6xl backdrop-blur-xl"
//       >
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-white hover:text-gray-300 text-xl font-bold cursor-pointer"
//         >
//           ✕
//         </button>

//         <h2 className="mb-8 mt-2 text-2xl font-semibold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//           Send SOL
//         </h2>

//         <div className="flex flex-col gap-6">
//           {/* Sender Address */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm text-slate-400">Sender Address</label>
//             <input
//               type="text"
//               value={walletAddress || ""}
//               disabled
//               className="bg-black/70 border border-white/20 text-white p-3 rounded-md placeholder:text-white/50 cursor-not-allowed"
//             />
//           </div>

//           {/* Receiver Address */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm text-slate-400">Receiver Address</label>
//             <input
//               type="text"
//               placeholder="Enter recipient wallet address"
//               value={toAddress}
//               onChange={(e) => setToAddress(e.target.value)}
//               className="bg-black/70 border border-white/20 text-white p-3 rounded-md placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-blue-500"
//             />
//           </div>

//           {/* Amount + Button */}
//           <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-2">
//             <div className="flex-1">
//               <label className="text-sm text-slate-400">Amount (SOL)</label>
//               <input
//                 type="number"
//                 placeholder="Enter amount to send"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 className="w-full bg-black/70 border border-white/20 text-white p-3 rounded-md placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>

//             <button
//               onClick={handleSend}
//               className="mt-4 sm:mt-6 sm:ml-6 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-3 rounded-xl transition-all duration-200 shadow-lg"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
