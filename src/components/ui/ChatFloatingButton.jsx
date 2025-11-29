// Icons
import { MessageCircle } from "lucide-react";

// Hooks
import { useState } from "react";

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
          // ✅ ACCESSIBILITY FIX: Added aria-label
          aria-label="Open Chat Window"
          className="animate-bouncing fixed flex-center bottom-32 right-6 md:bottom-12 md:right-12 z-[9999] 
          
          /* Industrial Styling */
          bg-[var(--panel-blue)] text-white gap-3 rounded-full border border-[var(--accent-yellow)] shadow-xl 
          
          /* Typography */
          px-4 py-2 md:px-8 md:py-4 transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]"
        >
          <MessageCircle className="size-5 md:size-6 text-[var(--accent-yellow)]" />
          {/* ✅ TYPOGRAPHY FIX: Applied Oswald font */}
          <div className="font-heading font-bold text-lg md:text-xl uppercase tracking-wide">
            Chat Us!
          </div>
        </button>
      )}

      {openChat && <ChatContainer setOpenChat={setOpenChat} />}
    </>
  );
};

export default ChatFloatingButton;
