import create from "zustand";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useAuthStore } from "./authStore";
import { messageStore } from "./messageStore";
import notify from "../assets/sounds/notify.mp3";

const { VITE_SOCKET_DEV, VITE_SOCKET_PROD } = import.meta.env;
const SOCKET_SERVER_URL =
  import.meta.env.MODE === "development" ? VITE_SOCKET_DEV : VITE_SOCKET_PROD;

export const useSocket = create((set, get) => ({
  socket: null,
  onlineUsers: [],

  connectToSocketServer: () => {
    const { user } = useAuthStore.getState();
    console.log(user.username);
    const socket = io(SOCKET_SERVER_URL, {
      query: {
        userId: user?.id,
      },
    });

    socket.connect();

    set({ socket: socket });

    socket.on("new-message", (newMessage) => {
      const { addMessage } = messageStore.getState();
      const sound = new Audio(notify);
      addMessage(newMessage);
      sound.play();
    });

    socket.on("join-chat", (userId) => {
      const { user } = useAuthStore.getState();
      const message =
        user.id === userId ? "Success! Joined Chat" : `${userId} Joined Chat`;

      toast.success(message, {
        id: "join-chat",
        duration: 5000,
        position: "bottom-left",
      });
    });

    socket.on("leave-chat", (userId) => {
      const { user } = useAuthStore.getState();
      const message =
        user.id === userId ? "Disconnected from Chat" : `${userId} Left a Chat`;

      toast.success(message, {
        id: "leave-chat",
        duration: 5000,
        position: "bottom-left",
      });
    });

    socket.on("online-users", (users) => {
      set({ onlineUsers: users });
    });
  },

  unsubscribeFromSocketEvents: () => {
    const { socket } = get();
    socket.off("new-messages");
    socket.off("join-chat");
    socket.off("leave-chat");
    socket.off("online-users");
  },

  disconnect: () => {
    const { socket, unsubscribeFromSocketEvents } = get();
    if (socket?.connected) {
      socket.disconnect();
      unsubscribeFromSocketEvents();
    }
  },
}));
