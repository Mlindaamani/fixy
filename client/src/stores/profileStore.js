import create from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../config/axiosInstance";
import { getBackendErrorMessage } from "../utils/functions";
import { TOAST_CONFIG } from "../utils/functions";

export const useProfileStore = create((set) => ({
  profileData: null,
  conversationId: null,
  creatingConversation: false,
  providers: [],
  loading: false,
  isFetchingProfile: false,
  isUpdatingProfile: false,
  isReceivingWebSocketEvents: false,


  getUserProfile: async () => {
    set({ isFetchingProfile: true });
    try {
      const response = await axiosInstance.get("/auth/me/profile");
      const { profile, message } = response.data;

      setTimeout(() => {
        set({ profileData: profile, isFetchingProfile: false });
        toast.success(message, {
          duration: 4000,
          position: "bottom-right",
          id: "service-provider",
        });
      }, 100);
    } catch (error) {
      const errorMessage = getBackendErrorMessage(error);
      set({ isFetchingProfile: false });
      toast.error(errorMessage, {
        ...TOAST_CONFIG,
        position: "bottom-right",
        id: "service-provider",
        icon: "assets/svg/fixy.svg",
        iconTheme: "#0EF",
      });
    }
  },

  createConversation: async (otherUserId, navigate) => {
    set({ creatingConversation: true });
    try {
      const response = await axiosInstance.post("/conversations/create", {
        otherUserId: otherUserId,
      });

      setTimeout(() => {
        toast.success(response.data.message, {
          duration: 4000,
          position: "bottom-center",
          id: "service-provider",
        });

        set({
          conversationId: response.data.conversationId,
          creatingConversation: false,
        });

        navigate(
          `/customer/room?conversationId=${response.data.conversationId}`
        );
      }, 100);
    } catch (error) {
      set({ creatingConversation: false });
      const errorMessage = getBackendErrorMessage(error);
      toast.error(errorMessage, {
        duration: 3000,
        position: "bottom-right",
        id: "service-provider",
      });
    }
  },

  updateServiceProviderProfile: async (serviceProviderId, updatedFormData) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put(
        `/providers/profile-update/${serviceProviderId}`,
        updatedFormData
      );

      setTimeout(() => {
        toast.success(response.data.message, {
          duration: 4000,
          position: "bottom-center",
          id: "service-provider",
        });

        set({ isUpdatingProfile: false });
      }, 100);
    } catch (error) {
      set({ isUpdatingProfile: false });
      const errorMessage = getBackendErrorMessage(error);
      toast.error(errorMessage, {
        duration: 3000,
        position: "bottom-right",
        id: "service-provider",
      });
    }
  },

  updateProfileImage: async (formData) => {
    set({ isUpdatingProfile: true });
    try {
      const { data } = await axiosInstance.post(
        "/auth/me/profile-image",
        formData
      );
      console.log(data);
      set((state) => ({
        profileData: { ...state.profileData, profileImage: data.profileImage },
        isUpdatingProfile: false,
      }));
    } catch (error) {
      console.error("Failed to update profile image:", error);
      set({ isUpdatingProfile: false });
      throw error;
    }
  },

  getServiceProviders: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/providers");
      set({ providers: response.data });
      set({ loading: false });
    } catch (error) {
      console.log(error.message);
      set({ loading: false });
      console.log(getBackendErrorMessage(error));
    }
  },
}));
