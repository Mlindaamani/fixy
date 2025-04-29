import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Toaster />
      <div className="w-full max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
        <div className="text-center mb-8 flex justify-center gap-3 items-center">
          <i className="fas fa-tools text-3xl text-indigo-600"></i>
          <h3 className="text-2xl font-bold !text-gray-600">Fixy</h3>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default LoginLayout;
