import create from "zustand";
import { axiosInstance } from "../config/axiosInstance";

export const useAnalyticsStore = create((set) => ({
  analytics: null,
  adminAnalytics: null,
  loading: false,
  error: null,

  fetchAnalytics: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/analytics/provider");
      set({ analytics: response.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch analytics",
        loading: false,
      });
    }
  },

  fetchAdminAnalytics: async (userFilter) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/analytics/admin", {
        params: { role: userFilter },
      });
      set({ adminAnalytics: response.data, loading: false });
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Failed to fetch admin analytics",
        loading: false,
      });
    }
  },

  fetchCustomerAnalytics: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("analytics/customer");
      set({ customerAnalytics: response.data, loading: false });
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Failed to fetch customer analytics",
        loading: false,
      });
    }
  },
}));
