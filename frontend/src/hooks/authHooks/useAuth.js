// import { useWallet } from "@solana/wallet-adapter-react";
// import { useState, useEffect, useContext } from "react";
// import {
//   createNonceRequest,
//   logoutRequest,
//   verifySignatureRequest,
// } from "../../api/auth";
// import bs58 from "bs58";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../context/UserContext";
// import {toast} from "react-toastify"
// import { useWallet as manualUseWallet } from "../contextHooks/useWalletHook.js";
// // import { useChatContext } from "../contextHooks/useChatContextHook";



// export const useAuth = () => {
//   const { publicKey, signMessage, connected } = useWallet();

//   const [walletAddress, setWalletAddress] = useState(null);

//   const navigate = useNavigate();
//   const { user,setUser } = useContext(UserContext);
//   const{userId,setUserId}=manualUseWallet();
//   // const {userProvider,setUserId}=useChatContext();

//   const login = async () => {
//     const nonceData = await createNonceRequest({
//       walletAddress: publicKey.toBase58(),
//     });
//     const nonce = nonceData.nonce;
//     if (!nonce) throw new Error("Failed to get nonce");

//     // 2️⃣ Sign nonce locally in wallet
//     const encoded = new TextEncoder().encode(nonce);
//     const signatureUint8 = await signMessage(encoded);
//     const signature = bs58.encode(signatureUint8);

//     // 3️⃣ Verify signature via backend
//     const verify = await verifySignatureRequest({
//       walletAddress: publicKey.toBase58(),
//       signature,
   
//     });
    
//     if (verify?.token) {
//       setUser({ walletAddress: publicKey.toBase58() }); //persistent in global storage
//       setWalletAddress(publicKey.toBase58());
//       console.log(verify+"from verifysignature2");
//       setUserId(verify.user.id)
//       // setUserId(verify.);
//       console.log("Login successful");
//       toast.success("Login successful", { position: "bottom-right", autoClose: 3000 });
//       navigate("/dashboard");
//     } else {
//         toast.error("Login failed", { position: "bottom-right", autoClose: 3000 });
//       throw new Error("Signature verification failed");
//     }
//   };
//   const logout = async () => {
//     const response = await logoutRequest();
//     console.log(response);
//     setWalletAddress(null);
//     setUser(null);
//     toast.success("Logout successful", { position: "bottom-right", autoClose: 3000 });
//     navigate("/");
//     if (response?.success) {
//       console.log("Logout successful");
//     } else {
//       console.log("Logout failed");
//     }
//   };

//   // Auto-login when wallet connects
//   useEffect(() => {
//     if (connected && publicKey && !walletAddress  ) {
   
//         login().catch(console.error);
//       }

//   }, [connected]);


//   return { walletAddress, login, logout };
// };


import { useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect, useContext } from "react";
import {
  createNonceRequest,
  logoutRequest,
  verifySignatureRequest,
} from "../../api/auth";
import bs58 from "bs58";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import { useWallet as manualUseWallet } from "../contextHooks/useWalletHook.js";

export const useAuth = () => {
  const { publicKey, signMessage, connected,disconnect } = useWallet();
  const [walletAddress, setWalletAddress] = useState(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { userId, setUserId } = manualUseWallet();

  const login = async () => {
    try {
      const nonceData = await createNonceRequest({
        walletAddress: publicKey.toBase58(),
      });
      const nonce = nonceData?.nonce;
      if (!nonce) throw new Error("Failed to get nonce");

      const encoded = new TextEncoder().encode(nonce);
      const signatureUint8 = await signMessage(encoded);
      const signature = bs58.encode(signatureUint8);

      const verify = await verifySignatureRequest({
        walletAddress: publicKey.toBase58(),
        signature,
      });

      if (verify?.token) {
        setUser({ walletAddress: publicKey.toBase58() });
        setWalletAddress(publicKey.toBase58());
        setUserId(verify.user.id);
        localStorage.setItem("authenticatedWallet", publicKey.toBase58());
        toast.success("Login successful", {
          position: "bottom-right",
          autoClose: 3000,
        });
        navigate("/dashboard");
      } else {
        toast.error("Login failed", { position: "bottom-right" });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

const logout = async () => {
  try {
    await logoutRequest();

    // ✅ Disconnect from wallet adapter itself
    await disconnect();

    // ✅ Clear adapter’s remembered wallet (prevents auto popup)
    localStorage.removeItem("walletName");
    localStorage.removeItem("authenticatedWallet");

    // ✅ Clear your app state
    setWalletAddress(null);
    setUser(null);

    toast.success("Logout successful", { position: "bottom-right", autoClose: 3000 });
    navigate("/");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
  // Auto-login only if not already authenticated
  useEffect(() => {
    const storedWallet = localStorage.getItem("authenticatedWallet");
    if (connected && publicKey) {
      if (!storedWallet || storedWallet !== publicKey.toBase58()) {
        // First-time connection — sign nonce
        login().catch(console.error);
      } else {
        // Already authenticated — skip wallet popup
        setWalletAddress(storedWallet);
        setUser({ walletAddress: storedWallet });
      }
    }
  }, [connected, publicKey]);

  return { walletAddress, login, logout };
};
