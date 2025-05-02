import create from "zustand";
import { axiosInstance } from "../config/axiosInstance";
import toast from "react-hot-toast";
import { getBackendErrorMessage } from "../utils/functions";
getBackendErrorMessage;

export const useProfileStore = create((set) => ({
  profileData: null,
  isFetchingProfile: false,
  isUpdatingProfile: false,

  getUserProfile: async () => {
    set({ isFetchingProfile: true });
    try {
      const response = await axiosInstance.get("/auth/me");

      setTimeout(() => {
        set({ profileData: response.data, isFetchingProfile: false });
        toast.success(response.data.message, {
          duration: 4000,
          position: "bottom-center",
          id: "service-provider",
        });
      }, 1000);
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
          duration: 5000,
          position: "bottom-center",
          id: "service-provider",
        });

        set({ isUpdatingProfile: false });
      }, 1000);
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
}));
