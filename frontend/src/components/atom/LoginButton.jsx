

import { useState, useRef, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAuth } from "../../hooks/authHooks/useAuth";
import { wallets } from "../../config/wallets";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

// Utility to shorten wallet address
const shortenAddress = (address, length = 4) => {
  if (!address) return "";
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};

const LoginButton = () => {
  const { select, connect, connected } = useWallet();
  const { user } = useContext(UserContext); // 👈 use global context instead
  const { logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false); // after login dropdown
  const modalRef = useRef();
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const handleSignInClick = () => setShowModal(true);

  const handleWalletSelect = async (walletName) => {
    select(walletName);
     {console.log("user from login button"+user)}
    if (!connected) await connect();
    setShowModal(false);
  };
  const disconnect = () => {
    logout();
    setShowAccountDropdown(false);
  };
  // Close modal if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);
  // Close account dropdown if click outside
  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAccountDropdown(false);
      }
    };
    if (showAccountDropdown) {
      document.addEventListener("mousedown", handleClickOutsideDropdown);
    }
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
  }, [showAccountDropdown]);

  // Portal modal rendering
  const Modal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ">
      <div
        ref={modalRef}
        className="bg-black text-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md border-1 border-gray-100/30"
      >
        <h3 className="mb-8 font-semibold text-center text-xl">
          Select Wallet
        </h3>
        <div className="grid grid-cols-2 gap-4 ">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              className="flex flex-col items-center justify-center p-4 border border-white/20 rounded-lg hover:bg-white/10 transition cursor-pointer"
              onClick={() => handleWalletSelect(wallet.name)}
            >
              {wallet.icon && (
                <img
                  src={wallet.icon}
                  alt={wallet.name}
                  className="w-8 h-8 mb-2"
                />
              )}
              <span className="text-sm">{wallet.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
  // Account dropdown below wallet address
  const AccountDropdown = () => (
    <div
      ref={dropdownRef}
      className="absolute -right-18 mt-6 w-56 bg-black/90 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-4 z-50"
    >
      <div className="mb-2 text-sm text-white/70 break-all">
     
        {user?.walletAddress}
      </div>
      <button
        className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 transition text-gray-400 cursor-pointer"
         onClick={() => navigator.clipboard.writeText(user?.walletAddress)}
      >
        Copy Address
      </button>
      <button
        className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 transition text-red-500"
        onClick={() => {
          disconnect();
          setShowAccountDropdown(false);
        }}
      >
        Logout
      </button>
    </div>
  );
  useEffect(() => {
  if (user) navigate("/"); // redirect after context updated
}, [user]);

  return (
    <div className="relative">
      {user?.walletAddress ? (
        <span
          onClick={() => setShowAccountDropdown((prev) => !prev)}
          className="p-2 rounded cursor-pointer border border-white/20"
        >
          {shortenAddress(user.walletAddress)}
        </span>
      ) : (
        <button
          onClick={handleSignInClick}
          className="bg-white text-black font-medium px-4 py-1 rounded-md hover:bg-neutral-300 transition cursor-pointer"
        >
          Log in
        </button>
      )}

      {showModal && ReactDOM.createPortal(<Modal />, document.body)}
      {showAccountDropdown && <AccountDropdown />}
    </div>
  );
};

export default LoginButton;
