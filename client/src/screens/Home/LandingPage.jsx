import React, { useState, useEffect } from "react";
import { professionals } from "../../lib/professionals";
import { testimonials } from "../../lib/testimonial";
import { services } from "../../lib/services";
import { Footer } from "../../components/Footer";
import hero from "../../assets/extra/hero.jpg";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const handleService = () => navigate("/services");

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage: `url(${hero})`,
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
          <p className="text-gray-600 text-center mb-12 py-3">
            Professional solutions for all your repair needs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
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
            <button
              onClick={handleService}
              className="!rounded-button bg-indigo-600 text-white px-8 py-3 hover:bg-indigo-700 transition-colors whitespace-nowrap"
            >
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
              <div className="text-4xl font-bold text-indigo-600 mb-2">95%</div>
              <p className="text-gray-600">Satisfaction Rate</p>
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
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl shadow-lg p-6"
              >
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
      <Footer />

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

export default LandingPage;
