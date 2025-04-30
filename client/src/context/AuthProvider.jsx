import React, { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const { verifyAccessToken, loading } = useAuthStore();

  useEffect(() => {
    verifyAccessToken();
  }, []);

  return (
    <AuthContext.Provider value={{ loading }}>{children}</AuthContext.Provider>
  );
};
