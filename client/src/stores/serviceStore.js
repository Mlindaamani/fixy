import create from "zustand";
import { axiosInstance } from "../config/axiosInstance";

export const useServiceStore = create((set) => ({
  services: [],
  service: null,
  isLoading: false,
  creatingService: false,
  deletingService: false,
  updatingService: false,

  getActiveServices: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/services");
      setTimeout(() => {
        set({ services: response.data, isLoading: false });
      }, 100);
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

  myServices: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/services/creator/my-services");
      setTimeout(() => {
        set({ services: response.data, isLoading: false });
      }, 500);
    } catch (error) {
      console.error("Error fetching services by creator:", error);
      set({ isLoading: false });
    }
  },

  createService: async (serviceData) => {
    set({ creatingService: true });
    try {
      const response = await axiosInstance.post("/services", serviceData);
      set((state) => ({
        services: [...state.services, response.data],
        creatingService: false,
      }));
    } catch (error) {
      console.error("Error creating service:", error);
      set({ creatingService: false });
    }
  },

  updateService: async (id, formData) => {
    set({ updatingService: true });
    try {
      const { data } = await axiosInstance.put(`/services/${id}`, formData);
      set((state) => ({
        services: state.services.map((s) => (s._id === id ? data : s)),
        updatingService: false,
      }));
    } catch (error) {
      console.error("Failed to update service:", error);
      set({ updatingService: false });
      throw error;
    }
  },

  deleteService: async (id) => {
    set({ deletingService: true });
    try {
      await axiosInstance.delete(`/services/${id}`);
      set((state) => ({
        services: state.services.filter((s) => s._id !== id),
        deletingService: false,
      }));
    } catch (error) {
      console.error("Failed to delete service:", error);
      set({ deletingService: false });
      throw error;
    }
  },
}));
