import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [activeChannelId, setActiveChannelId] = useState(null);
  const [activeMessages, setActiveMessages] = useState([]);
  const [userId, setUserId] = useState(null); // from profile

  return (
    <ChatContext.Provider
      value={{
        activeChannelId,
        setActiveChannelId,
        activeMessages,
        setActiveMessages,
        userId,
        setUserId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
