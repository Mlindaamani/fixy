import create from "zustand";
import { axiosInstance } from "../config/axiosInstance";

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
      throw error;
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
}));
