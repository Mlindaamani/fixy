import create from "zustand";
import { axiosInstance } from "../config/axiosInstance";
import toast from "react-hot-toast";
import { getBackendErrorMessage } from "../utils/functions";
getBackendErrorMessage;

export const useProfileStore = create((set) => ({
  profileData: null,
  fetchingProfile: false,
  updatingProfile: false,

  getServiceProviderProfile: async () => {
    set({ fetchingProfile: true });
    try {
      const response = await axiosInstance.get("/auth/me");
      set({ profileData: response.data, fetchingProfile: false });
    } catch (error) {
      const errorMessage = getBackendErrorMessage(error);
      set({ fetchingProfile: false });
      toast.error(errorMessage, {
        ...TOAST_CONFIG,
        id: "service-provider",
      });
    }
  },

  updateServiceProviderProfile: async (serviceProviderId, upddatedFormData) => {
    set({ updatingProfile: true });
    try {
      const response = await axiosInstance.put(
        `/providers/profile-update/${serviceProviderId}`,
        upddatedFormData
      );
      toast.success(response.data.message);
      set({ updatingProfile: false });
    } catch (error) {
      set({ updatingProfile: false });
      const erroeMessage = getBackendErrorMessage(error);
      toast.error(erroeMessage, {
        duration: 3000,
        position: "top-center",
        id: "service-provider",
      });
    }
  },
}));
