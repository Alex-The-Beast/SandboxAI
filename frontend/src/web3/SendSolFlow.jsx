

// import { useWallet } from "@solana/wallet-adapter-react";
// import { useState } from "react";
// import { sendRequest, verifyTransaction } from "../api/agent";
// import { Transaction } from "@solana/web3.js";

// export default function SendSolFlow({ to, amount }) {
//   const { publicKey, signTransaction, sendTransaction } = useWallet();
//   const [status, setStatus] = useState("");

//   const handleSend = async () => {
//     try {
//       setStatus("Preparing transaction...");
//       const { unsignedBase64, requestId } = await sendRequest({
//         from: publicKey.toBase58(),
//         to,
//         amount,
//       });

//       const tx = Transaction.from(Buffer.from(unsignedBase64, "base64"));
//       setStatus(`Please sign transaction to send ${amount} SOL to ${to}`);
//       const signed = await signTransaction(tx);

//       const txid = await sendTransaction(signed, connection);
//       setStatus("Verifying transaction on-chain...");
//       const res = await verifyTransaction({ requestId, txid });

//       setStatus(res.status === "confirmed" ? "✅ Transaction confirmed" : "❌ Failed");
//     } catch (err) {
//       console.error(err);
//       setStatus("Something went wrong: " + err.message);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleSend}>Send {amount} SOL to {to}</button>
//       <p>{status}</p>
//     </div>
//   );
// }
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { Transaction } from "@solana/web3.js";

import { connection } from "../config/rpcConfig.js";

export default function SendSolFlow({ unsignedTx, to, amount }) {
  const { sendTransaction } = useWallet();
  const [status, setStatus] = useState("");

  const handleConfirm = async () => {
    try {
      setStatus("Opening wallet...");
      const tx = Transaction.from(Buffer.from(unsignedTx, "base64"));

      // ✅ This opens the wallet, signs, and sends automatically
      const txid = await sendTransaction(tx, connection);

      setStatus(`✅ Sent ${amount} SOL to ${to}\nTxID: ${txid}`);
    } catch (err) {
      console.error("❌ Transaction error:", err);
      setStatus("Failed: " + err.message);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleConfirm}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Confirm & Send {amount} SOL
      </button>
      {status && <p className="text-sm text-gray-300">{status}</p>}
    </div>
  );
}
