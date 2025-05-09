import create from "zustand";
import { axiosInstance } from "../config/axiosInstance";

export const useServiceStore = create((set) => ({
  services: [],
  service: null,
  isLoading: false,

  getActiveServices: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/services");
      setTimeout(() => {
        set({ services: response.data, isLoading: false });
      }, 1000);
    } catch (error) {
      console.error("Error fetching services:", error);
      set({ isLoading: false });
    }
  },

  getServiceById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/services/${id}`);
      set({ service: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching service by ID:", error);
      set({ isLoading: false });
    }
  },

  createService: async (serviceData) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post("/services", serviceData);
      set((state) => ({
        services: [...state.services, response.data],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error creating service:", error);
      set({ isLoading: false });
    }
  },
}));
