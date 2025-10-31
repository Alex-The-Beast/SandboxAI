import { useState, useRef, useEffect } from "react";
import { useContact } from "../../../hooks/contactHooks/useContact.js";
import { toast } from "react-toastify";

export const AddContactModalContent = ({ onClose }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState(null);
  const modalRef = useRef();
  const { addNewContact } = useContact();

  // ✅ Handle save
  const handleSave = async () => {
    if (!name || !address) {
 toast.info("Please enter a name and address", {
  position: "top-right",
  autoClose: 3000,
 })
      return;
    }
    try {
      await addNewContact(name, address);
      onClose();
    } catch (err) {
      alert("Failed to add contact. Please try again.");
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
          Add Contact
        </h2>

        <div className="flex flex-col gap-4">
          <div>Your Name</div>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-black/80 border border-white/20 text-white p-2 rounded placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div>Wallet Address</div>

          <input
            type="text"
            placeholder="Enter correct wallet address"
            onChange={(e) => setAddress(e.target.value)}
            className="bg-black/80 border border-white/20 text-white p-2 rounded placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          <div className="flex justify-end ">
            <button
              onClick={handleSave}
              className="bg-gray-700/70 hover:bg-gray-900/70 text-white px-6 py-2 rounded transition cursor-pointer mt-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
