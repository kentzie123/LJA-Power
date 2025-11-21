// Icons
import { MessageCircle } from "lucide-react";

// Hooks
import { useState, useEffect } from "react";

// UI
import ChatContainer from "./ChatContainer";

// Stores
import { useAuthStore } from "../../stores/useAuthStore";

const ChatFloatingButton = () => {
  const { connectSocket, fetchClientLocalData, clientId, createClientAccount } =
    useAuthStore();

  const [openChat, setOpenChat] = useState(false);

  const openChatBox = async () => {
    setOpenChat(true);
    const isClientHaveData = await fetchClientLocalData();

    if (!isClientHaveData) {
      console.log(`No clientId: ${clientId}`);
      createClientAccount();
    }
    connectSocket();
  };

  return (
    <>
      {!openChat && (
        <button
          onClick={openChatBox}
          className="animate-bouncing fixed flex-center bottom-12 right-12 z-100 bg-[var(--panel-blue)] text-white gap-3 rounded-full border border-[var(--accent-yellow)]/50 cursor-pointer px-4 py-2 md:px-8 md:py-4"
        >
          <MessageCircle className="size-5 md:size-6" />
          <div className="font-bold text-lg md:text-xl">Chat Us!</div>
        </button>
      )}

      {openChat && <ChatContainer setOpenChat={setOpenChat} />}
    </>
  );
};

export default ChatFloatingButton;
