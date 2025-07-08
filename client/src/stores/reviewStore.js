import create from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../config/axiosInstance";
import { getBackendErrorMessage } from "../utils/functions";
import { TOAST_CONFIG } from "../utils/functions";

export const useReviewStore = create((set) => ({
  reviews: [],
  isLoading: false,

  createReview: async (serviceId, reviewData) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.post("/reviews", {
        serviceId,
        ...reviewData,
      });
      set((state) => ({
        reviews: [...state.reviews, data],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to create review:", error);
      set({ isLoading: false });
      const errorMessage = getBackendErrorMessage(error);
      toast.error(errorMessage, {
        ...TOAST_CONFIG,
        id: "register",
      });
    }
  },

  getReviews: async (serviceId) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get(`/reviews/service/${serviceId}`);
      set({ reviews: data, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      set({ isLoading: false });
      throw error;
    }
  },

  deleteReview: async (id) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/reviews/${id}`);
      set((state) => ({
        reviews: state.reviews.filter((r) => r._id !== id),
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to delete review:", error);
      set({ isLoading: false });
      throw error;
    }
  },
}));
