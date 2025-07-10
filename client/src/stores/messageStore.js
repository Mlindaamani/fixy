import create from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../config/axiosInstance";
import { getBackendErrorMessage } from "../utils/functions";

export const messageStore = create((set, get) => ({
  messages: [],
  conversations: [],
  isLoadingMessage: false,
  isSendingMessage: false,
  selectedConversation: null,

  setSelectedUser: (userToChatWith) => {
    set({ selectedConversation: userToChatWith });
  },


  setSelectedConversation: (conversation) => {
    set({ selectedConversation: conversation });
  },

  sendMessage: async (message) => {
    const { selectedConversation, messages } = get();
    set({ isSendingMessage: true });

    try {
      const response = await axiosInstance.post("/messages/send/", {
        message,
        conversationId: selectedConversation.conversationId,
      });

      set({ messages: [...messages, response.data], isSendingMessage: false });
    } catch (error) {
      set({ isSendingMessage: false });
      const newError = getBackendErrorMessage(error);
      toast.error(newError, {
        duration: 3000,
        position: "top-center",
        id: "new-message",
      });
    }
  },

  getMessages: async () => {
    set({ isLoadingMessage: true });

    const { selectedConversation } = get();
    try {
      if (selectedConversation) {
        const response = await axiosInstance.get(
          `/messages/${selectedConversation.conversationId}`
        );

        set({ messages: response.data, isLoadingMessage: false });
      }
    } catch (error) {
      set({ isLoadingMessage: false });
      console.error(getBackendErrorMessage(error));
    }
  },

  getConversations: async () => {
    try {
      const response = await axiosInstance.get("/conversations/");
      set({ conversations: response.data });
    } catch (error) {
      console.error(getBackendErrorMessage(error));
    }
  },

  updateMessages: (newMessage) => {
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },
}));
