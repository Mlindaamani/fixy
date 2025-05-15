import create from "zustand";
import { axiosInstance } from "../config/axiosInstance";
import toast from "react-hot-toast";
import { getBackendErrorMessage } from "../utils/functions";
getBackendErrorMessage;
import { TOAST_CONFIG } from "../utils/functions";

export const useProfileStore = create((set) => ({
  profileData: null,
  providers: [],
  loading: false,
  isFetchingProfile: false,
  isUpdatingProfile: false,

  getUserProfile: async () => {
    set({ isFetchingProfile: true });
    try {
      const response = await axiosInstance.get("/auth/me/profile");
      const { profile, message } = response.data;

      setTimeout(() => {
        set({ profileData: profile, isFetchingProfile: false });
        toast.success(message, {
          duration: 4000,
          position: "top-center",
          id: "service-provider",
        });
      }, 100);
    } catch (error) {
      const errorMessage = getBackendErrorMessage(error);
      set({ isFetchingProfile: false });
      toast.error(errorMessage, {
        ...TOAST_CONFIG,
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
        position: "top-center",
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
      console.log(response.data);
      set({ providers: response.data });
      set({ loading: false });
    } catch (error) {
      console.log(error.message);
      set({ loading: false });
      console.log(getBackendErrorMessage(error));
    }
  },
}));
