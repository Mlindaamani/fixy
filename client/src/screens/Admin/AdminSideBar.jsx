import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUtilsStore } from "../../stores/utilsStore";
import adminLinks from "../../lib/customerLinks";



const AdminSidebar = () => {
  const { isSidebarCollapsed, setIsSidebarCollapsed } = useUtilsStore();
  const location = useLocation();

  return (
    <div
      className={`${
        isSidebarCollapsed ? "w-20" : "w-64"
      } bg-white shadow-sm transition-all duration-300 fixed h-full flex flex-col z-50`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-indigo-50 to-white">
        {!isSidebarCollapsed && (
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-screwdriver-wrench text-2xl text-indigo-600"></i>
            <span className="text-lg font-semibold text-indigo-600">Fixy</span>
          </div>
        )}
        <button
          onClick={() => setIsSidebarCollapsed()}
          className="p-2 !rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors focus:outline-none h-8 w-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
        >
          <i
            className={`fa-solid ${
              isSidebarCollapsed ? "fa-chevron-right" : "fa-chevron-left"
            } text-indigo-600 text-lg`}
          ></i>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 mt-4 overflow-y-auto">
        {adminLinks.map((link, index) => {
          const isActive = location.pathname === link.route;
          return (
            <Link
              key={index}
              to={link.route}
              className={`flex items-center p-4 mx-2 rounded-lg ${
                isActive
                  ? "bg-indigo-100 text-indigo-600 font-medium"
                  : "!text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
              } transition-colors text-decoration-none`}
            >
              <i className={`${link.icon} text-lg`}></i>
              <span
                className={`ml-4 text-sm ${
                  isSidebarCollapsed ? "hidden" : "block"
                }`}
              >
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
