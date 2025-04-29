import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const RegisterLayout = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Toaster />
      <div className="w-full max-w-4xl mx-auto p-10 bg-white shadow-lg rounded-lg">
        <div className="text-center mb-8 flex justify-center gap-3 items-center">
          <i className="fas fa-tools text-4xl text-indigo-600"></i>
          <h3 className="text-3xl font-bold !text-gray-600">Fixy</h3>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default RegisterLayout;
