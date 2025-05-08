import React, { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { AuthContext } from "./AuthContext";
import LoadingSpinner from "../components/Spinner";

export const AuthProvider = ({ children }) => {
  const { verifyAccessToken, loading } = useAuthStore();

  useEffect(() => {
    verifyAccessToken();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <AuthContext.Provider value={{ loading }}>{children}</AuthContext.Provider>
  );
};
