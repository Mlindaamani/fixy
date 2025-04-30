import React, { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useAuthStore } from "../stores/authStore";

export const AuthProvider = ({ children }) => {
  const { verifyAccessToken, loading } = useAuthStore();

  useEffect(() => {
    verifyAccessToken();
  }, []);

  return (
    <AuthContext.Provider value={{ loading }}>{children}</AuthContext.Provider>
  );
};
