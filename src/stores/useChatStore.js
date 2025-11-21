import { create } from "zustand";

// Axios
import api from "../utils/axios";

// Stores
import { useAuthStore } from "./useAuthStore";

// Toast
import { toast } from "react-toastify";

export const useChatStore = create((set, get) => ({
  messages: [],
  isSendingMessage: false,
  isMessagesLoading: false,

  fetchMessages: async (clientId) => {
    try {
      set({ isMessagesLoading: true });
      const res = await api.get(`/messages/get/${clientId}`);

      set({ messages: res.data.data.reverse() });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  addMessageToChat: (message) => {
    set({ messages: [...get().messages, message] });
  },

  addTemporaryMessage: (message) => {
    const { clientId } = useAuthStore.getState();

    const tempId = Date.now();
    const tempMessage = {
      ...message,
      sender_id: clientId,
      isSending: true,
      created_at: new Date(),
      id: tempId,
    }; // added isSending for Sending... status in ChatBubble // added sender_id positions chat bubble in the right side (sender position)

    set({
      messages: [...get().messages, tempMessage],
    });

    return tempId;
  },

  removeTemporaryMessage: (tempId, trueMessage) => {
    // Added this to remove Sending... status in chat bubble
    const newArrayMessages = get().messages.map((msg) =>
      msg.id === tempId ? trueMessage : msg
    );

    return newArrayMessages;
  },

  sendMessage: async (message) => {
    console.log(message);
    
    const { clientId } = useAuthStore.getState();
    try {
      set({ isSendingMessage: true });
      const tempId = get().addTemporaryMessage(message);

      // Prepare the message data for the backend
      const messageData = {
        text: message.text,
        attachments: message.attachments, // Array of file objects with URLs
      };

      const trueMessage = await api.post(
        `/messages/clientSending/${clientId}`,
        messageData
      );

      const newArrayMessages = get().removeTemporaryMessage(
        tempId,
        trueMessage.data.data
      );
      set({ messages: newArrayMessages });
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message");
    } finally {
      set({ isSendingMessage: false });
    }
  },

  handleNewMessageListener: (socket) => {
    socket.on("new_message", (newMessage) => {
      const { clientId } = useAuthStore.getState();
      if (clientId === newMessage.receiver_id) {
        get().addMessageToChat(newMessage);
      }
    });
  },
}));
