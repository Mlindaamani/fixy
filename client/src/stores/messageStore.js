import create from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../config/axiosInstance";
import { getBackendErrorMessage } from "../utils/functions";

export const messageStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  deleting: false,

  setSelectedUser: (userToChatWith) => {
    set({ selectedUser: userToChatWith });
  },

  sendNewMessage: async (message) => {
    const { selectedUser, messages } = get();
    try {
      if (!selectedUser) {
        toast.error("Please select a user to chat with.");
        return;
      }

      const { data: newMessage } = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        {
          message,
        }
      );
      set({ messages: [...messages, newMessage] });
    } catch (error) {
      console.error(getBackendErrorMessage(error));
    }
  },

  getMessages: async () => {
    const { selectedUser } = get();
    try {
      if (selectedUser._id) {
        const { data } = await axiosInstance.get(
          `/messages/chats/${selectedUser._id}`
        );
        set({ messages: data });
      }
    } catch (error) {
      console.error(getBackendErrorMessage(error));
    }
  },

  getChatUsers: async () => {
    try {
      const { data } = await axiosInstance.get("/users/chat-users/");
      set({ users: data });
    } catch (error) {
      console.error(getBackendErrorMessage(error));
    }
  },

  deleteConversation: async (conversationId) => {
    set({ deleting: true });
    try {
      const response = await axiosInstance.delete(
        `/messages/delete/${conversationId}`
      );
      toast.success(response.data.message);
      set({ deleting: false });
    } catch (error) {
      set({ deleting: false });
      toast.error(`${getBackendErrorMessage(error)}`, {
        duration: 4000,
        id: "delete-message",
      });
    } finally {
      set({ deleting: false });
    }
  },

  addMessage: (newMessage) => {
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },
}));
