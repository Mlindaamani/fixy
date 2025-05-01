import toast from "react-hot-toast";
import create from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../config/axiosInstance";
import { getBackendErrorMessage } from "../utils/functions";
import {
  removeTokens,
  storeTokens,
  getAccessToken,
  getRefreshToken,
} from "../utils/localStorage";

const TOAST_CONFIG = {
  duration: 3000,
  position: "top-center",
};

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,

      register: async (formData, navigate) => {
        set({ loading: true });
        try {
          await axiosInstance.post("/auth/register/", formData);
          set({ loading: false });
          toast.success("You have successfully registered", {
            ...TOAST_CONFIG,
            id: "register",
          });
          navigate("/login");
        } catch (error) {
          const errorMessage = getBackendErrorMessage(error);
          set({ loading: false });
          toast.error(errorMessage, {
            ...TOAST_CONFIG,
            id: "register",
          });
        }
      },

      login: async (formData, navigate) => {
        set({ loading: true });
        try {
          const response = await axiosInstance.post("/auth/login/", formData);

          const { id, username, email, role, accessToken, refreshToken } =
            response.data;
          storeTokens(accessToken, refreshToken);
          set({
            isAuthenticated: true,
            loading: false,
            user: { id, username, email, role },
          });

          toast.success("You have successfully logged in", {
            ...TOAST_CONFIG,
            duration: 4000,
            id: "login",
          });

          if (role == "customer") {
            navigate("/customer");
          } else if (role === "serviceProvider") {
            navigate("/dashboard");
          }
        } catch (error) {
          const errorMessage = getBackendErrorMessage(error);
          set({ loading: false });
          toast.error(errorMessage, {
            ...TOAST_CONFIG,
            id: "login",
          });
        }
      },

      logout: (navigate) => {
        removeTokens();
        set({ isAuthenticated: false, user: null });
        toast.success("Logged out successfully", {
          ...TOAST_CONFIG,
          id: "logout",
        });
        navigate("/login", { replace: true });
      },

      verifyAccessToken: async () => {
        const token = getAccessToken();
        if (!token) {
          set({ isAuthenticated: false, user: null });
          return false;
        }

        try {
          const response = await axiosInstance.get("/auth/verify-token");
          if (response.data.success) {
            set({ isAuthenticated: true });
            return true;
          }
        } catch (error) {
          removeTokens();
          set({ isAuthenticated: false, user: null });
          return false;
        }
      },

      refreshAccessToken: async () => {
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          set({ isAuthenticated: false, user: null });
          return false;
        }

        set({ loading: true });
        try {
          const response = await axiosInstance.post("/auth/refresh-token", {
            refreshToken,
          });
          const { accessToken } = response.data;

          storeTokens(accessToken, refreshToken);
          set({ isAuthenticated: true, loading: false });

          return true;
        } catch (error) {
          set({ isAuthenticated: false, user: null, loading: false });
          removeTokens();
          toast.error(getBackendErrorMessage(error), {
            duration: 3000,
            position: "top-center",
            id: "refresh-token",
          });
          return false;
        }
      },
    }),
    { name: "fixy-storage", getStorage: () => localStorage }
  )
);
