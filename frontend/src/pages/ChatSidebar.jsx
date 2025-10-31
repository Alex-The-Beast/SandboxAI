import { useEffect, useState } from "react";
import {
  FiHome,
  FiBook,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiFileText,
} from "react-icons/fi";
import { BsDiscord } from "react-icons/bs";
import { Volleyball } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import ChatSettingsButton from "../components/atom/ChatSettingsButton";
import { getAllChannel } from "../api/chat";
import { useLocation } from "react-router-dom";

export default function ChatSidebar({ profile }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [channels, setChannels] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

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

  const YinYangIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 496"
      fill="currentColor"
      className="w-6 h-6 text-white"
    >
      <path d="M248 0C111 0 0 111 0 248s111 248 248 248 248-111 248-248S385 0 248 0zm0 464c-119.1 0-216-96.9-216-216S128.9 32 248 32s216 96.9 216 216-96.9 216-216 216zM248 88c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160S336.4 88 248 88zm0 256c-53 0-96-43-96-96s43-96 96-96c26.5 0 48 21.5 48 48s-21.5 48-48 48-48 21.5-48 48 21.5 48 48 48z" />
    </svg>
  );

  return (
    <aside
      className={`relative ${
        isCollapsed ? "w-20" : "w-64"
      } bg-black/30 border-r border-zinc-800 flex flex-col h-screen transition-all duration-300`}
    >
      {/* Top Logo */}
      <Link to="/">
        <div
          className={`flex items-center justify-start ${
            isCollapsed ? "px-6" : "px-4"
          }  py-4 border-b border-zinc-800 shrink-0`}
        >
          <div className="flex items-center gap-2">
            <YinYangIcon className="text-white/80" size={22} />

            {!isCollapsed && (
              <span className="text-white/80 text-sm font-medium">
                Sandbox AI
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-5 text-zinc-400 text-xl items-center md:items-start px-6 py-5 shrink-0">
        <TooltipItem
          collapsed={isCollapsed}
          icon={<FiHome />}
          label="Home"
          to="/"
        />
        <TooltipItem
          collapsed={isCollapsed}
          icon={<FiFileText />}
          label="New Chat"
          onClick={() => navigate("/chat")}
        />
        <TooltipItem collapsed={isCollapsed} icon={<FiBook />} label="Docs" />
        <TooltipItem
          collapsed={isCollapsed}
          icon={<BsDiscord />}
          label="Discord"
        />
      </nav>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto smooth-scroll px-3">
        {!isCollapsed && (
          <>
            <div className="text-xs text-zinc-500 uppercase mb-2 px-2 mt-8">
              Recent Chats
            </div>
            <div className="flex flex-col gap-2 pb-4 ">
              {channels?.length > 0 ? (
                channels.map((ch) => {
                  const isActive = location.pathname === `/chat/${ch._id}`;
                  return (
                    <div
                      key={ch._id}
                      onClick={() => navigate(`/chat/${ch._id}`)}
                      className={`text-sm  rounded-2xl px-4 py-2 cursor-pointer truncate border transition
                        ${
                          isActive
                            ? "bg-zinc-800/30 text-gray-100 border-zinc-700"
                            : "text-zinc-500 hover:bg-zinc-800/30 hover:text-gray-200 border-transparent hover:border-zinc-700"
                        }`}
                    >
                      {ch.name || `Session ${ch._id.slice(-6)}`}
                    </div>
                  );
                })
              ) : (
                <div className="text-zinc-600 text-xs px-3">
                  No active chats yet.
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-800 py-4 flex items-center gap-3 justify-start px-4 shrink-0 cursor-pointer hover:text-white transition">
        <ChatSettingsButton icon={<FiSettings size={20} />} />
        {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
      </div>

      {/* Collapse/Expand Button — vertically centered */}
      <button
        onClick={() => setIsCollapsed((p) => !p)}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-zinc-900 border border-zinc-700 rounded-full p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
      >
        {isCollapsed ? (
          <FiChevronRight size={16} />
        ) : (
          <FiChevronLeft size={16} />
        )}
      </button>

      <style>{`
  .smooth-scroll {
    scroll-behavior: smooth;
  }

  /* 🧩 Subtle gray (Tailwind gray-700) scrollbar styling */
  .smooth-scroll::-webkit-scrollbar {
    width: 6px;
  }

  .smooth-scroll::-webkit-scrollbar-track {
    background: transparent;
  }

  .smooth-scroll::-webkit-scrollbar-thumb {
    background-color: #3f3f46; /* Tailwind gray-700 */
    border-radius: 4px;
    transition: background-color 0.2s ease;
  }

  .smooth-scroll::-webkit-scrollbar-thumb:hover {
    background-color: #52525b; /* Tailwind gray-600 for hover */
  }

  /* Firefox support */
  .smooth-scroll {
    scrollbar-width: thin;
    scrollbar-color: #3f3f46 transparent;
  }

  /* Tooltip styles remain same */
  .tooltip {
    position: absolute;
    left: 4.5rem;
    background: rgba(28, 28, 28, 0.9);
    color: #fff;
    font-size: 10px;
    padding: 4px 6px;
    border-radius: 4px;
    opacity: 0;
    white-space: nowrap;
    pointer-events: none;
    transition: opacity 0.15s ease;
  }
  .tooltip-container:hover .tooltip {
    opacity: 1;
  }
`}</style>
    </aside>
  );
}

/* 🧩 Reusable item with tiny tooltip */
const TooltipItem = ({ icon, label, to, onClick, collapsed }) => {
  const Element = to ? Link : "div";

  return (
    <Element
      to={to}
      onClick={onClick}
      className="tooltip-container relative flex items-center gap-3 hover:text-white transition cursor-pointer"
    >
      <div className="text-lg">{icon}</div>
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
      {collapsed && <span className="tooltip">{label}</span>}
    </Element>
  );
};
