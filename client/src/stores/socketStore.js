import create from "zustand";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useAuthStore } from "./authStore";
import { messageStore } from "./messageStore";
import notify from "../assets/sounds/notify.mp3";

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_DEV;

export const useSocket = create((set, get) => ({
  socket: null,
  onlineUsers: [],

  connectToSocketServer: () => {
    const { user } = useAuthStore.getState();
    const socket = io(SOCKET_SERVER_URL, { query: { userId: user?.id } });

    socket.connect();
    set({ socket: socket });

    socket.on("new-message", (newMessage) => {
      const { user } = useAuthStore.getState();
      const { updateMessages } = messageStore.getState();
      if (newMessage.senderId !== user?.id) {
        const sound = new Audio(notify);
        updateMessages(newMessage);
        sound.play();
      }
    });

    socket.on("join-chat", (userId) => {
      const { user } = useAuthStore.getState();
      const message =
        user.id === userId ? "Success! Joined Chat" : `${userId} Joined Chat`;

      toast.success(message, {
        id: "join-chat",
        duration: 1000,
        position: "bottom-center",
        id: "join-chat",
      });
    });

    socket.on("leave-chat", (userId) => {
      const { user } = useAuthStore.getState();
      const message =
        user.id === userId ? "Disconnected from Chat" : `${userId} Left a Chat`;

      toast.success(message, {
        id: "leave-chat",
        duration: 5000,
        position: "bottom-center",
        id: "leave-chat",
      });
    });

    socket.on("online-users", (users) => {
      set({ onlineUsers: users });
    });

    socket.on("scheduled-notification", (data) => {
      toast.success(data.message, {
        duration: 9000,
        position: "bottom-right",
        id: "schedule",
      });
    });

    socket.on("system-status", (data) => {
      toast.success(`${data.currentOnline} users Currently online`, {
        duration: 9000,
        position: "bottom-right",
        id: "system-status",
      });
    });
  },

  unsubscribeFromSocketEvents: () => {
    const { socket } = get();
    socket.off("new-message");
    socket.off("join-chat");
    socket.off("leave-chat");
    socket.off("online-users");
    socket.off("system-status");
    socket.off("scheduled-notification");
  },

  disconnect: () => {
    const { socket, unsubscribeFromSocketEvents } = get();
    if (socket?.connected) {
      socket.disconnect();
      unsubscribeFromSocketEvents();
    }
  },
}));
