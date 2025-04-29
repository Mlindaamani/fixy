import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import LoadingSpinner from "../components/Spinner";

export const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
