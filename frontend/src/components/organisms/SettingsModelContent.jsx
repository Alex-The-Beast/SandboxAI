// src/components/modals/SettingsModalContent.jsx
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useWallet } from "../../hooks/contextHooks/useWalletHook.js";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
const SettingsModalContent = ({ onClose }) => {
  const modalRef = useRef();
  const { profile, updateProfile } = useWallet();
  console.log(profile + "from settings");
  const [name, setName] = useState(profile?.name || "");
  const [image, setImage] = useState(profile?.image || null);
  const{user}=useContext(UserContext);

  const handleSave = async () => {
    if (!name) {
      toast.info("Please enter a name to update your profile.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    try {
      await updateProfile({ name, image });

      onClose();
    } catch (err) {
      console.log(err);

    }
  };

  // Close modal if click outside
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
        className="relative bg-black text-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md border border-gray-100/30"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 text-xl font-bold cursor-pointer"
        >
          ✕
        </button>

        <h2 className="mb-6 mt-8 text-xl font-semibold text-center">
          User Settings
        </h2>

        <div className="flex flex-col gap-4">
          <div>Your Address</div>
          <input
            type="text"
            placeholder="Enter your name"
            value={user?.walletAddress}
          
            className="bg-black/80 border border-white/20 text-white p-2 rounded placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled="true"
          />
          <div>Your Name</div>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-black/80 border border-white/20 text-white p-2 rounded placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div>Your Image</div>

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="bg-black/80 border border-white/20 text-white p-2 rounded placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          <div className="flex justify-end ">
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition cursor-pointer mt-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModalContent;
