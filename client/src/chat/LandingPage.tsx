import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Link } from "react-router-dom";
import { professionals } from "../lib/professionals";
import { testimonials } from "../lib/testimonial";
import { services } from "../lib/services";

export const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [location, setLocation] = useState("");
  const statsCharto = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (statsCharto.current) {
      const chart = echarts.init(statsCharto.current);
      const option = {
        animation: true,
        series: [
          {
            type: "pie",
            radius: ["65%", "80%"],
            label: { show: false },
            data: [
              {
                value: 95,
                name: "Satisfaction Rate",
                itemStyle: { color: "#4F46E5" },
              },
              { value: 5, name: "Others", itemStyle: { color: "#E5E7EB" } },
            ],
          },
        ],
      };
      chart.setOption(option);
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <i className="fas fa-tools text-3xl text-indigo-600 mr-2"></i>
              <span className="text-2xl font-bold text-gray-800">
                RepairPro
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-600 hover:text-indigo-600 no-underline hover:underline"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-gray-600 hover:text-indigo-600"
              >
                Services
              </Link>
              <Link to="/extra" className="text-gray-600 hover:text-indigo-600">
                Extra
              </Link>
              <Link to="#" className="text-gray-600 hover:text-indigo-600">
                How It Works
              </Link>
              <Link
                to="/professionals"
                className="text-gray-600 hover:text-indigo-600"
              >
                Professionals
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-indigo-600 "
              >
                Contact
              </Link>

              <Link
                to="/booking"
                className="text-gray-600 hover:text-indigo-600 "
              >
                Booking
              </Link>

              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-indigo-600 "
              >
                Dashboard
              </Link>
              <button className="!rounded-button bg-indigo-600 text-white px-6 py-2 hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap">
                Book Now
              </button>
            </div>
            <button className="md:hidden text-gray-600">
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage:
            "url(https://readdy.ai/api/search-image?query=professional&width=1440&height=800&seq=10&orientation=landscape&flag=8a14d9c6701387ec3525f045ebacfbfd)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-600/50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Expert Repair Services at Your Fingertips
            </h1>
            <p className="text-xl text-white/90 mb-8 py-3">
              Connect with trusted professionals for all your repair needs.
              Quality service guaranteed.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <i className="fas fa-map-marker-alt absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="Enter your location"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border-none text-sm"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="flex-1 relative">
                  <i className="fas fa-tools absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <select
                    className="w-full pl-12 pr-4 py-3 rounded-lg border-none text-sm appearance-none cursor-pointer"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                  >
                    <option value="">Select service type</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="hvac">HVAC</option>
                    <option value="carpentry">Carpentry</option>
                  </select>
                </div>
                <button className="!rounded-button bg-indigo-600 text-white px-8 py-3 hover:bg-indigo-700 transition-colors whitespace-nowrap">
                  Find Professional
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-gray-600 text-center mb-12">
            Professional solutions for all your repair needs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:-translate-y-2 cursor-pointer"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <i
                    className={`fas ${service.icon} text-3xl text-indigo-600 mb-4`}
                  ></i>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="!rounded-button bg-indigo-600 text-white px-8 py-3 hover:bg-indigo-700 transition-colors whitespace-nowrap">
              View All Services
            </button>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-gray-600 text-center mb-12">
            Get your repairs done in three simple steps
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-search text-3xl text-indigo-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">1. Choose Your Service</h3>
              <p className="text-gray-600">
                Browse through our wide range of professional repair services
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-user-check text-3xl text-indigo-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">
                2. Match with Professional
              </h3>
              <p className="text-gray-600">
                Get matched with Link qualified professional in your area
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-check-circle text-3xl text-indigo-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">3. Get It Fixed</h3>
              <p className="text-gray-600">
                Sit back and relax while we take care of your repair needs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Showcase */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">
            Meet Our Professionals
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Experienced and trusted experts ready to help
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {professionals.map((pro, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={pro.image}
                    alt={pro.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{pro.name}</h3>
                  <p className="text-indigo-600 mb-2">{pro.specialty}</p>
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                    <span className="text-gray-600">{pro.rating}</span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    {pro.jobs} jobs completed
                  </p>
                  <p className="text-gray-600">{pro.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                10,000+
              </div>
              <p className="text-gray-600">Customers Served</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                500+
              </div>
              <p className="text-gray-600">Professional Experts</p>
            </div>
            <div className="text-center">
              <div
                ref={statsCharto}
                style={{ width: "200px", height: "200px" }}
                className="mx-auto"
              ></div>
              <p className="text-gray-600">95% Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Real feedback from satisfied customers
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.service}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-indigo-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust our professional
            repair services
          </p>
          <button className="!rounded-button bg-white text-indigo-600 px-8 py-3 hover:bg-gray-100 transition-colors whitespace-nowrap">
            Get Started Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <i className="fas fa-tools text-3xl text-indigo-400 mr-2"></i>
                <span className="text-2xl font-bold">RepairPro</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for professional repair services
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    Professionals
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="text-gray-400 hover:text-white"
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
                  <span>1-800-REPAIR</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope mr-2"></i>
                  <span>contact@repairpro.com</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  <span>123 Repair Street, Fix City</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for updates and tips
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 border-none"
                />
                <button className="!rounded-button bg-indigo-600 px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2025 RepairPro. All rights reserved.
            </p>
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

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="!rounded-button fixed bottom-8 right-8 bg-indigo-600 text-white w-12 h-12 flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </div>
  );
};
