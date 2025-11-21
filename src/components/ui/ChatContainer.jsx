// Icons
import { X } from "lucide-react";

// UI
import SendMessage from "./SendMessage";
import ChatBubble from "./ChatBubble";

// Stores
import { useChatStore } from "../../stores/useChatStore";
import { useAuthStore } from "../../stores/useAuthStore";

// Hooks
import { useEffect, useRef } from "react";

const ChatContainer = ({ setOpenChat }) => {
  const chatContainerRef = useRef();
  const { messages } = useChatStore();
  const { clientId } = useAuthStore();

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Attach native wheel listener to prevent page scroll
  useEffect(() => {
    const el = chatContainerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      const atTop = el.scrollTop === 0 && e.deltaY < 0;
      const atBottom =
        el.scrollHeight - el.scrollTop === el.clientHeight && e.deltaY > 0;

      if (atTop || atBottom) {
        e.preventDefault();
      }
      e.stopPropagation();
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-4 sm:right-4 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12 z-50 w-full sm:w-100 sm:h-140 rounded-none sm:rounded-xl shadow-2xl flex flex-col overflow-hidden border-0 sm:border border-[var(--card-blue)]">
      {/* Header */}
      <div className="bg-[var(--panel-blue)] text-white flex items-center justify-between p-4 border-b border-[var(--card-blue)]">
        <div className="flex items-center gap-3">
          <img
            className="w-8 h-8 rounded-full"
            src="/images/lja-logo.png"
            alt="lja logo"
          />
          <div className="font-semibold text-sm sm:text-base">
            LJA Chat Support
          </div>
        </div>
        <button
          onClick={() => setOpenChat(false)}
          className="p-2 rounded-lg hover:bg-[var(--card-blue)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent-yellow)] focus:ring-opacity-50"
          aria-label="Close chat"
        >
          <X
            size={20}
            className="text-[var(--muted-gray)] hover:text-white transition-colors"
          />
        </button>
      </div>

      {/* Messages Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 bg-white overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent"
      >
        <div className="px-3 py-4 space-y-4 min-h-full">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-[var(--muted-gray)]">
                <div className="text-lg font-semibold mb-2">
                  Welcome to LJA Chat!
                </div>
                <div className="text-sm">
                  Start a conversation by sending a message.
                </div>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message}
                isMine={clientId === message.sender_id}
              />
            ))
          )}
        </div>
      </div>

      {/* Input */}
      <SendMessage />
    </div>
  );
};

export default ChatContainer;
