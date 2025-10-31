import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { useRef, useEffect, useState } from "react";
import SendSolFlow from "../web3/SendSolFlow";

export default function ChatSession({
  messages,
  input,
  setInput,
  loading,
  onSend,
}) {
  const chatEndRef = useRef(null);
  const [inputHeight, setInputHeight] = useState("auto");

  // Scroll to bottom whenever messages update
  useEffect(() => {
    const timeout = setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
    return () => clearTimeout(timeout);
  }, [messages, loading]);

  // Custom Yin–Yang Icon
  const YinYangIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 496"
      fill="currentColor"
      className="w-4 h-4 text-white mr-2 shrink-0"
    >
      <path d="M248 0C111 0 0 111 0 248s111 248 248 248 248-111 248-248S385 0 248 0zm0 464c-119.1 0-216-96.9-216-216S128.9 32 248 32s216 96.9 216 216-96.9 216-216 216zM248 88c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160S336.4 88 248 88zm0 256c-53 0-96-43-96-96s43-96 96-96c26.5 0 48 21.5 48 48s-21.5 48-48 48-48 21.5-48 48 21.5 48 48 48z" />
    </svg>
  );

  const handleInputChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
    setInputHeight(`${e.target.scrollHeight}px`);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    onSend();
    setInput("");
    setInputHeight("auto");
  };

  return (
    <motion.div
      key="chat"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-screen max-h-screen w-full md:w-5xl mx-auto text-white px-4 md:px-32 py-10"
    >
      {/* Scrollable Messages */}
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.03 }}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            } mb-3`}
          >
            <div
              className={`max-w-[98%] p-3 rounded-2xl text-sm leading-relaxed break-words break-all whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-gray-600/30 text-white rounded-br-sm"
                  : "bg-transparent text-gray-300 flex "
              }`}
            >
              {msg.sender === "bot" && <YinYangIcon className="" />}
              {msg.body}
        {      console.log("msg structure:", msg)}

              {console.log("hiww", msg.unsignedTx , msg.requestId, msg.amount, msg.to, "from bot")}
              {msg.unsignedTx && (
                <div className="mt-3 bg-red-700 p-3 w-full h-18">
                  <SendSolFlow
                    unsignedTx={msg.unsignedTx}
                    requestId={msg.requestId}
                    amount={msg.amount}
                    to={msg.to}
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-center space-x-2 text-gray-400 italic">
            {[0, 0.2, 0.4].map((delay, i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 bg-gray-500 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1, delay }}
              />
            ))}
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {/* Input Area */}
      <div className=" bg-zinc-900 border border-zinc-800 rounded-2xl flex items-end p-3">
        <textarea
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          style={{
            height: inputHeight,
            maxHeight: "140px",
          }}
          className="flex-1 bg-transparent outline-none text-zinc-300 px-3 resize-none overflow-y-auto custom-scrollbar"
        />

        <button
          onClick={handleSend}
          className="bg-white text-black rounded-xl px-4 py-3 flex items-center justify-center hover:bg-zinc-200 transition"
        >
          <FiSend />
        </button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </motion.div>
  );
}
