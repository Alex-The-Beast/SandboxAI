import { useEffect, useState, createContext } from "react";
import { getAllContacts } from "../api/contact";
import { getSolBalance } from "../api/web3";
import { toast } from "react-toastify";
import { updateRequest } from "../api/auth";
import { sendSol as rpcSendSol } from "../api/rpc";
import { useUserContextHook } from "../hooks/contextHooks/useUserContextHook.js";

export const WalletContext = createContext();

export const WalletProvider = ({ walletAddress, children }) => {
  const [balance, setBalance] = useState(0);
  const [trx, setTrx] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({ name: "", image: "" });
  const [userId, setUserId] = useState(null);

  const { setIsProfileUpdated } = useUserContextHook();

  const updateProfile = async ({ name, image }) => {
    try {
      const res = await updateRequest({ name, image });

      if (res.success) {
        setProfile({ name: res.name, image: res.image });
        setIsProfileUpdated((prev) => !prev);
        toast.success("Profile updated successfully", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error("Profile update failed", err);
      toast.error("Failed to update profile", {
        position: "top-right",
        autoClose: 3000,
      });
      throw err;
    }
  };

  // Fetch SOL balance
  const fetchBalance = async (walletAddress) => {
    if (!walletAddress) return;
    setLoadingBalance(true);
    try {
      console.log(walletAddress + " from WalletContext");
      console.log(userId+"from the hell")
      const res = await getSolBalance({ walletAddress }); // ensure getSolBalance accepts string
      const bal = res?.data?.balance || res?.balance || 0;
      setBalance(bal);
    } catch (err) {
      console.error("Error fetching SOL balance:", err);
      setBalance(0);
      toast.error("Failed to fetch SOL balance.", {
        position: "bottom-right",
        autoClose: 3000,
      });
      setError("Failed to fetch balance");
    } finally {
      setLoadingBalance(false);
    }
  };

  const fetchContacts = async () => {
    try {
      setLoadingContacts(true);
      const res = await getAllContacts(); // axios GET /contacts
      if (res.success) {
        setContacts(res.contacts); // store array directly
      } else {
        setContacts([]);
      }
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
      setContacts([]);
    } finally {
      setLoadingContacts(false);
    }
  };

  const sendSol = async ({
    connected,
    connect,
    sendTransaction,
    toAddress,
    amount,
  }) => {
    if (!sendTransaction) {
      toast.error("❌ Wallet not connected.");
      return;
    }
    if (!toAddress || !amount) {
      toast.error("⚠️ Please enter both recipient address and amount.");
      return;
    }
    try {
      const signature = await rpcSendSol({
        connected,
        connect,
        sendTransaction,
        fromAddress: walletAddress,
        toAddress,
        amount,
      });
      if (signature) {
        // Refresh balance asynchronously, don't block UI
        fetchBalance(walletAddress).catch((err) =>
          console.error("❌ Error fetching balance:", err)
        );
        return signature;
      }
    } catch (error) {
      console.error("❌ Error in sendSol (WalletContext):", error);
      toast.error(error?.message || "❌ Transaction failed. Please try again.");
    }
  };

  // Combined effect: run when walletAddress changes
  useEffect(() => {
    if (!walletAddress) {
      toast.error("Wallet Address required.", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    fetchBalance(walletAddress);
    fetchContacts();
  }, [walletAddress]);

  return (
    <WalletContext.Provider
      value={{
        balance,
        trx,
        contacts,
        profile,
        loadingBalance,
        loadingContacts,
        error,
        setTrx,
        fetchBalance,
        fetchContacts,
        updateProfile,
        sendSol,
        userId,
        setUserId,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
