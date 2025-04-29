import axios from "axios";
import { getAccessToken } from "../utils/localStorage";
import { useAuthStore } from "../stores/authStore";
const { VITE_BACKEND_URL_DEV, VITE_BACKEND_URL_PROD } = import.meta.env;

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? VITE_BACKEND_URL_DEV
      : VITE_BACKEND_URL_PROD,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },

  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const previousRequest = error.config;

    if (error.response?.status === 401 && !previousRequest.sent) {
      previousRequest.sent = true;

      const { refreshAccessToken } = useAuthStore.getState();
      const success = await refreshAccessToken();

      if (success) {
        previousRequest.headers.Authorization = `JWT ${getAccessToken()}`;
        return axiosInstance(previousRequest);
      } else {
        useAuthStore.getState().logout();
      }
    }
    return Promise.reject(error);
  }
);
