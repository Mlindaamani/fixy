import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRegister = (role) => {
    navigate(`/register?role=${role}`);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300  ${
        isScrolled ? "bg-indigo-600 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="w-full mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <i className="fas fa-tools text-3xl text-indigo-600 mr-2"></i>
            <span className={`text-2xl font-bold text-white `}>Fixy</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="no-underline  !text-blue-50">
              Home
            </Link>
            <Link to="/services" className="no-underline !text-blue-50">
              Services
            </Link>
            <Link to="/contact" className="no-underline !text-blue-50">
              Contact
            </Link>
            <Link to="/professionals" className="no-underline !text-blue-50">
              Professionals
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="no-underline !text-blue-50">
                  Dashboard
                </Link>

                <button
                  onClick={() => logout(navigate)}
                  className="!rounded-full bg-indigo-400 !text-blue-50 px-6 py-2 hover:bg-indigo-600 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="no-underline !text-blue-50">
                  Login
                </Link>
                <button
                  onClick={() => handleRegister("customer")}
                  className="!rounded-button bg-indigo-600 text-white px-6 py-2 hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Hire Pro
                </button>
                <button
                  onClick={() => handleRegister("serviceProvider")}
                  className="!rounded-button bg-indigo-400 text-white px-6 py-2 hover:bg-indigo-800 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Join as Pro
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
