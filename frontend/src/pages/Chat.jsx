// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect, useRef } from "react";
// import {
//   FiSend,
//   FiHome,
//   FiSettings,
//   FiBook,
//   FiMessageSquare,
//   FiUser,
// } from "react-icons/fi";
// import ChatSettingsButton from "../components/atom/ChatSettingsButton";
// import { Link } from "react-router-dom";
// import { useUserContextHook } from "../hooks/contextHooks/useUserContextHook.js";
// import { sendMessage } from "../api/chat";

// export default function Chat() {
//   const { profile } = useUserContextHook();
//   const [isChatStarted, setIsChatStarted] = useState(false);
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const chatEndRef = useRef(null);
//   const [isCollapsed, setIsCollapsed] = useState(true);
//   const [channelId, setChannelId] = useState(null);

//   // Scroll to bottom when new message arrives
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   const handleSendMessage = async () => {
//     if (!input.trim()) return;
//     if (!isChatStarted) setIsChatStarted(true);

//     const newMessage = { body: input, sender: "user" };
//     setMessages((prev) => [...prev, newMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const userId = profile.id;
//       if (!userId) throw new Error("User ID missing");

//       // Use existing or new channel
//       const res = await sendMessage(input, userId, channelId);

//       if (res?.success && Array.isArray(res.message)) {
//         // Append new messages (bot + user)
//         setMessages((prev) => [...prev, ...res.message]);

//         // If it's a new session, save the channel ID
//         if (!channelId) setChannelId(res.channelId);
//       } else {
//         throw new Error("Invalid response format");
//       }
//     } catch (error) {
//       console.log(error + "error in send message button");
//       setMessages((prev) => [
//         ...prev,
//         { body: "Error: " + error, sender: "bot" },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const prompts = [
//     {
//       title: "Swap 1 ETH to USDC",
//       desc: "Instantly swap your ETH to USDC securely using Sandbox AI.",
//     },
//     {
//       title: "Stake my 500 MATIC",
//       desc: "Earn rewards by staking your MATIC through trusted protocols.",
//     },
//     {
//       title: "Bridge 2 SOL to Ethereum",
//       desc: "Move assets across chains seamlessly with our bridge feature.",
//     },
//     {
//       title: "Check my wallet balance",
//       desc: "Get real-time portfolio insights across all your connected wallets.",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-[#0E0E0E] text-white flex overflow-hidden scrollbar-hide">
//       {/* Sidebar */}
//       {isCollapsed ? (
//         <aside className="w-16 md:w-20 bg-black flex flex-col items-center py-6 border-r border-zinc-800">
//           <div className="w-10 h-10 bg-gray-200/10 rounded-xl mb-10 flex items-center justify-center">
//             {profile?.name?.charAt(0) || "S"}
//           </div>

//           <nav className="flex flex-col gap-8 text-zinc-400 text-xl">
//             <Link to="/">
//               <FiHome className="hover:text-white cursor-pointer transition" />
//             </Link>
//             <FiMessageSquare className="hover:text-white cursor-pointer transition" />
//             <FiBook className="hover:text-white cursor-pointer transition" />
//             <FiUser className="hover:text-white cursor-pointer transition" />
//           </nav>
//           <div className="mt-auto mb-4 w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer transition">
//             <ChatSettingsButton icon={<FiSettings size={20} />} />
//           </div>
//         </aside>
//       ) : (
//         <aside className="w-20 md:w-60 bg-black flex flex-col items-start px-4 py-6 border-r border-zinc-800">
//           <div className="w-full bg-gray-200/10 rounded-xl mb-10 flex items-center justify-start">
//             <div className="px-4 py-2 text-xs"> {profile?.name}</div>
//             <div>»</div>
//           </div>

//           <nav className="flex flex-col gap-8 text-zinc-400 text-xl">
//             <Link to="/">
//               <FiHome className="hover:text-white cursor-pointer transition" />
//             </Link>
//             <div className="flex flex-reverse  space-x-4 items-center justify-center cursor-pointer hover:text-white/90 hover:bg-gray-200/10 bg-gray-200/10 py-2 px-4 rounded-xl">
//               <FiMessageSquare className="hover:text-white cursor-pointer transition" />
//               <div className="text-sm">New Chat</div>
//             </div>
//             <FiBook className="hover:text-white cursor-pointer transition" />
//             <FiUser className="hover:text-white cursor-pointer transition" />
//           </nav>
//           <div className="mt-auto mb-4 w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer transition">
//             <ChatSettingsButton icon={<FiSettings size={20} />} />
//           </div>
//         </aside>
//       )}

//       {/* Main Content */}
//       <AnimatePresence mode="wait">
//         {!isChatStarted ? (
//           <motion.div
//             key="landing"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0, y: -40 }}
//             transition={{ duration: 0.4 }}
//             className="relative flex flex-col items-center justify-center w-full top-12"
//           >
//             {/* Top Tabs */}
//             <div className="flex space-x-8 bg-white/5 rounded-2xl px-4 py-2 items-center backdrop-blur-md">
//               <div className="text-gray-300 hover:text-gray-100 transition">
//                 Agent
//               </div>
//               <Link to="/dashboard">
//                 <div className="text-white/50">Dashboard</div>
//               </Link>
//             </div>

//             {/* Main Landing */}
//             <main className="flex-1 flex flex-col justify-center items-start px-6 md:px-64 py-4 text-left">
//               <motion.h1
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//                 className="text-3xl md:text-5xl font-semibold mb-2"
//               >
//                 Hi there,{" "}
//                 <span className="text-zinc-400">
//                   {profile?.name || "Sandbox User"}
//                 </span>
//               </motion.h1>

//               <motion.h2
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2, duration: 0.6 }}
//                 className="text-2xl md:text-4xl font-semibold text-zinc-200 mb-10"
//               >
//                 What would you like to do?
//               </motion.h2>

//               <p className="text-zinc-400 mb-8 text-sm md:text-base max-w-3xl">
//                 Use one of the common crypto actions below or simply type your
//                 own request — Sandbox AI understands human language and executes
//                 safely.
//               </p>

//               {/* Prompt Cards */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 w-full max-w-4xl">
//                 {prompts.map((item, i) => (
//                   <motion.div
//                     key={i}
//                     whileHover={{ scale: 1.05 }}
//                     className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 w-full min-h-[150px] flex flex-col justify-between hover:border-zinc-600 transition"
//                   >
//                     <div>
//                       <h3 className="text-zinc-100 font-medium mb-2 text-base md:text-lg">
//                         {item.title}
//                       </h3>
//                       <p className="text-zinc-400 text-sm leading-snug">
//                         {item.desc}
//                       </p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Input */}
//               <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 w-full max-w-4xl flex items-center gap-3">
//                 <input
//                   type="text"
//                   placeholder="Ask whatever you want..."
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   className="bg-transparent flex-1 outline-none text-zinc-300 text-sm md:text-base px-3"
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   className="bg-white text-black rounded-xl px-4 py-3 flex items-center gap-2 hover:bg-zinc-200 transition"
//                 >
//                   <FiSend />
//                 </button>
//               </div>
//             </main>
//           </motion.div>
//         ) : (
//           <motion.div
//             key="chat"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0, y: 40 }}
//             transition={{ duration: 0.5 }}
//             className="flex flex-col min-w-6xl max-w-7xl mx-auto px-6 md:px-32 py-10"
//           >
//             <div className="flex-1   p-6 flex flex-col max-h-[80vh] overflow-y-auto scrollbar-hide">
//               {messages?.map((msg, idx) => (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: idx * 0.05 }}
//                   className={`flex ${
//                     msg.sender === "user" ? "justify-end" : "justify-start"
//                   } mb-4`}
//                 >
//                   <div
//                     className={`max-w-[60%] p-3 rounded-2xl whitespace-pre-wrap ${
//                       msg.sender === "user"
//                         ? "bg-gray-600/20 text-white rounded-br-sm"
//                         : "bg-gray-800/10 text-gray-200 border border-gray-700/40"
//                     }`}
//                   >
//                     {msg.body}
//                   </div>
//                 </motion.div>
//               ))}

//               {loading && (
//                 <div className="flex items-center space-x-2 text-gray-400 italic">
//                   <motion.div
//                     className="w-3 h-3 bg-gray-500 rounded-full"
//                     animate={{ opacity: [0.3, 1, 0.3] }}
//                     transition={{ repeat: Infinity, duration: 1 }}
//                   />
//                   <motion.div
//                     className="w-3 h-3 bg-gray-500 rounded-full"
//                     animate={{ opacity: [0.3, 1, 0.3] }}
//                     transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
//                   />
//                   <motion.div
//                     className="w-3 h-3 bg-gray-500 rounded-full"
//                     animate={{ opacity: [0.3, 1, 0.3] }}
//                     transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
//                   />
//                 </div>
//               )}

//               <div ref={chatEndRef}></div>
//             </div>

//             {/* Input Bar */}
//             <div className="mt-4 flex items-center bg-zinc-900 border border-zinc-800 rounded-2xl p-3">
//               <input
//                 type="text"
//                 placeholder="Type your message..."
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 className="flex-1 bg-transparent outline-none text-zinc-300 px-3"
//                 onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//               />
//               <button
//                 onClick={handleSendMessage}
//                 className="bg-white text-black rounded-xl px-4 py-3 flex items-center gap-2 hover:bg-zinc-200 transition"
//               >
//                 <FiSend />
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
  FiSend,
  FiHome,
  FiSettings,
  FiBook,
  FiMessageSquare,
  FiUser,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { useUserContextHook } from "../hooks/contextHooks/useUserContextHook";
import ChatSession from "./ChatSession";
import ChatLanding from "./ChatLanding";
import {
  sendMessage,
  getMessagesByChannelId,
  getAllChannel,
} from "../api/chat";
import { Link } from "react-router-dom";
import ChatSettingsButton from "../components/atom/ChatSettingsButton";
import ChatSidebar from "./ChatSideBar";

export default function Chat() {
  const { profile } = useUserContextHook();
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [isChatStarted, setIsChatStarted] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [channelId, setChannelId] = useState(sessionId || null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [channels, setChannels] = useState([]);
  const [trx, setTrx] = useState();

  // Load existing messages if sessionId is in URL
  useEffect(() => {
    if (sessionId) {
      setIsChatStarted(true);
      (async () => {
        try {
          const res = await getMessagesByChannelId(sessionId);
          setMessages(res.messages);
        } catch (err) {
          console.error("Failed to load messages:", err);
        }
      })();
    }
  }, [sessionId]);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const res = await getAllChannel();
        if (res?.channels) setChannels(res.channels);
      } catch (error) {
        console.log("Error fetching channels:", error);
      }
    };
    fetchChannels();
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    if (!isChatStarted) setIsChatStarted(true);

    const newMsg = { body: input, sender: "user" };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendMessage(input, profile.id, channelId);
      // if (res.success) {
      //   setMessages((prev) => [...prev, ...res.message]);
      //  console.log(res.unsignedTx?.unsignedBase64,"from lol hello send message ")
      //  setTrx(res.unsignedTx?.unsignedBase64)
      //   // New chat → navigate to /chat/:channelId
      //   if (!channelId && res.channelId) {
      //     setChannelId(res.channelId);
      //     navigate(`/chat/${res.channelId}`);
      //   }
      // }
      // we have change this only for trx 
      if (res.success) {
        setMessages((prev) => [...prev, ...res.message]);

        // If backend returned unsignedTx separate from res.message, insert a bot message:
        if (res.unsignedTx?.unsignedBase64) {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              body: "Transaction prepared. Confirm to send.",
              unsignedTx: res.unsignedTx.unsignedBase64,
              requestId: res.unsignedTx.requestId, // if available
              amount: res.unsignedTx.amount, // if available
              to: res.unsignedTx.to, // if available
            },
          ]);
        }

        if (!channelId && res.channelId) {
          setChannelId(res.channelId);
          navigate(`/chat/${res.channelId}`);
        }
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { body: "Error sending message.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white flex overflow-hidden ">
      <ChatSidebar profile={profile} />
      <AnimatePresence mode="wait">
        {!isChatStarted ? (
          <ChatLanding
            profile={profile}
            input={input}
            setInput={setInput}
            onSend={handleSendMessage}
          />
        ) : (
          <ChatSession
            messages={messages}
            input={input}
            setInput={setInput}
            loading={loading}
            onSend={handleSendMessage}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
