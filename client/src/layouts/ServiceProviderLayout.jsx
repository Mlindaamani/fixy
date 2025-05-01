import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import ServiceProSidebar from "../screens/serviceProvider/ServiceProSidebar";
import dev_steve from "../assets/extra/dev-steve.jpg";
import { useUtilsStore } from "../stores/utilsStore";

const ServiceProviderLayout = () => {
  const {
    isSidebarCollapsed,
    isProfileDropdownOpen,
    setIsProfileDropdownOpen,
  } = useUtilsStore();

  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <ServiceProSidebar />

      {/* Main Content */}
      <div
        className={`flex-1 ${
          isSidebarCollapsed ? "ml-20" : "ml-64"
        } transition-all duration-300`}
      >
        {/* Dashborad header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="flex items-center flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 border rounded-lg text-sm  focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 "
                />
                <i className="fa-solid fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen()}
                  className="!rounded-button cursor-pointer flex items-center space-x-3 focus:outline-none"
                >
                  <img
                    src={dev_steve}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-xs text-gray-500">{user?.role}</p>
                  </div>
                  <i className="fa-solid fa-chevron-down  text-sm  text-indigo-600"></i>
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm !text-gray-700 hover:bg-gray-100 text-decoration-none"
                    >
                      {user?.username}
                    </Link>

                    <hr className="my-2" />
                    <button
                      onClick={() => logout(navigate)}
                      className="block px-4 py-2 text-sm !text-red-600 hover:bg-gray-100 text-decoration-none w-full"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
        <Toaster />
      </div>
    </div>
  );
};

export default ServiceProviderLayout;
