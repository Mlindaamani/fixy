import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useProfileStore } from "../stores/profileStore";

const DashboardHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { profileData, getUserProfile } = useProfileStore();

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 h-16">
        {/* Search Bar */}
        <div className="flex items-center flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 border rounded-lg text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <i className="fa-solid fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <img
              src={profileData?.profileImage || null}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
              loading="lazy"
            />
            <div className="hidden md:flex flex-col justify-center">
              <p className="text-sm font-medium text-gray-700 leading-none mt-4">
                {user?.username}
              </p>
              <p className="text-xs text-gray-500 leading-tight capitalize">
                {user?.role}
              </p>
            </div>
          </div>
          <button
            onClick={() => logout(navigate)}
            className="text-red-600 hover:text-red-800 focus:outline-none"
            title="Logout"
          >
            <i className="fa-solid fa-sign-out-alt text-lg"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
