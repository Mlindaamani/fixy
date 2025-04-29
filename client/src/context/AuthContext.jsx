import React, { createContext, useEffect } from "react";
import { useAuthStore } from "../stores/authStore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { verifyAccessToken, loading } = useAuthStore();

  useEffect(() => {
    verifyAccessToken();
  }, [verifyAccessToken]);

  return (
    <AuthContext.Provider value={{ loading }}>{children}</AuthContext.Provider>
  );
};
