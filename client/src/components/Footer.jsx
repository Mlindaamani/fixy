import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <i className="fas fa-tools text-3xl text-indigo-400 mr-2"></i>
              <span className="text-2xl font-bold">Fixy</span>
            </div>
            <p className="text-gray-400">
              Your trusted partner for professional repair services
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white text-decoration-none"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white text-decoration-none"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white text-decoration-none"
                >
                  Professionals
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white text-decoration-none"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-400 hover:text-white text-decoration-none "
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <i className="fas fa-phone mr-2"></i>
                <span>+255622054125</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2"></i>
                <span>devsteve@fixy.com</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i>
                <span>Ada Estate, Oysterbay</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2025 Fixy. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook text-xl"></i>
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter text-xl"></i>
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram text-xl"></i>
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-linkedin text-xl"></i>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
