import { create } from "zustand";

// Socket Client
import io from "socket.io-client";

// API
import api from "../utils/axios";

// Toast
import { toast } from "react-toastify";

// Stores
import { useChatStore } from "./useChatStore";

// Generate Client ID
const generateClientId = () => {
  const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit number
  return `Client${randomNum}`;
};

export const useAuthStore = create((set, get) => ({
  clientId: "",
  socket: null,

  connectSocket: () => {
    const socket = io(import.meta.env.VITE_API_URL, {
      query: {
        userId: get().clientId,
      },
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.connected);
      set({ socket });
    });


    // New Messages Listener
    useChatStore.getState().handleNewMessageListener(socket);

  },

  fetchClientLocalData: () => {
    const clientId = localStorage.getItem("clientId");

    if (clientId) {
      set({ clientId });
      const { fetchMessages } = useChatStore.getState();
      fetchMessages(clientId);
    }
  },

  createClientAccount: async () => {
    const clientRandomId = generateClientId();
    set({ clientId: clientRandomId });

    try {
      await api.post(`/auth/create`, { clientId: clientRandomId });
      localStorage.setItem("clientId", clientRandomId);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  },
}));
