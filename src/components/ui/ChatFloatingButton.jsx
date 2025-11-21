// Icons
import { MessageCircle } from "lucide-react";

// Hooks
import { useState, useEffect } from "react";

// UI
import ChatContainer from "./ChatContainer";

// Stores
import { useAuthStore } from "../../stores/useAuthStore";

const ChatFloatingButton = () => {
  const {
    connectSocket,
    fetchClientLocalData,
    clientId,
    createClientAccount
  } = useAuthStore();

  const [openChat, setOpenChat] = useState(false);

  useEffect(() => {
    fetchClientLocalData();
  }, []);

  const openChatBox = () => {
    if (!clientId) {
      createClientAccount();
    }
    setOpenChat(true);
    connectSocket();
  };

  return (
    <>
      {!openChat && (
        <button
          onClick={openChatBox}
          className="animate-bouncing fixed flex-center bottom-12 right-12 z-100 bg-[var(--panel-blue)] text-white gap-3 rounded-full border border-[var(--accent-yellow)]/50 cursor-pointer px-8 py-4"
        >
          <MessageCircle />
          <div className="font-bold text-xl">Chat Us!</div>
        </button>
      )}

      {openChat && <ChatContainer setOpenChat={setOpenChat} />}
    </>
  );
};

export default ChatFloatingButton;
