import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="text-center max-w-lg mx-auto">
        <i className="fas fa-tools text-6xl text-indigo-600 mb-4"></i>
        <h1 className="text-4xl font-bold !text-gray-600 mb-4">
          404 - Page Not Found
        </h1>
        <p className="!text-gray-600 text-lg mb-6">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 text-base font-medium text-decoration-none"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
