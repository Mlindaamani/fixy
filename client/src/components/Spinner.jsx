import React from "react";

const LoadingSpinner = () => {
  return (
    <div
      className="flex items-center justify-center h-screen bg-gray-100"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
