// src/context/ModalContext.js
import  { createContext, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

export const ModelContext = createContext();

// Provider component
export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null); // store JSX for the modal
  const modalRef = useRef();

  // Open modal
  const openModal = (content) => {
    setModalContent(content);
  };

  // Close modal
  const closeModal = () => setModalContent(null);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    if (modalContent) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [modalContent]);

  // Modal JSX
  const Modal = () =>
    modalContent
      ? ReactDOM.createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div ref={modalRef} className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md">
              {modalContent}
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <ModelContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal />
    </ModelContext.Provider>
  );
};

// Custom hook for easier usage

