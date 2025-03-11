import React, { useState, useEffect } from "react";

export const ComprehensiveServices = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      id: 1,
      name: "Emergency Plumbing Repair",
      category: "plumbing",
      price: 150,
      duration: "1-2 hours",
      coverage: "All Areas",
      rating: 4.9,
      reviews: 128,
      description:
        "Fast response emergency plumbing services for leaks, clogs, and repairs",
      image:
        "https://public.readdy.ai/ai/img_res/6e18e998d333a33fdf38ace535fee363.jpg",
    },
    {
      id: 2,
      name: "Electrical Panel Upgrade",
      category: "electrical",
      price: 800,
      duration: "4-6 hours",
      coverage: "Metro Area",
      rating: 4.8,
      reviews: 95,
      description:
        "Complete electrical panel upgrades and modernization services",
      image:
        "https://public.readdy.ai/ai/img_res/95e0dd598c29c36c0f9b8c9c9553023c.jpg",
    },
    {
      id: 3,
      name: "HVAC System Maintenance",
      category: "hvac",
      price: 299,
      duration: "2-3 hours",
      coverage: "All Areas",
      rating: 4.9,
      reviews: 156,
      description:
        "Comprehensive HVAC system inspection and maintenance service",
      image:
        "https://public.readdy.ai/ai/img_res/acb45276097db88e4356e7d942bdcea4.jpg",
    },
    {
      id: 4,
      name: "Kitchen Remodeling",
      category: "carpentry",
      price: 950,
      duration: "3-5 days",
      coverage: "Metro Area",
      rating: 4.7,
      reviews: 82,
      description:
        "Custom kitchen cabinet installation and remodeling services",
      image:
        "https://public.readdy.ai/ai/img_res/70281c80e092b1d0d4d599c0d3e66bd5.jpg",
    },
    {
      id: 5,
      name: "Smart Home Installation",
      category: "electrical",
      price: 450,
      duration: "4-5 hours",
      coverage: "All Areas",
      rating: 4.8,
      reviews: 73,
      description: "Complete smart home device installation and setup services",
      image:
        "https://public.readdy.ai/ai/img_res/9e8d72cc82b0b6ee221366c3cb3cce4e.jpg",
    },
    {
      id: 6,
      name: "Bathroom Renovation",
      category: "plumbing",
      price: 850,
      duration: "2-3 days",
      coverage: "Metro Area",
      rating: 4.9,
      reviews: 91,
      description: "Full bathroom renovation and plumbing upgrade services",
      image:
        "https://public.readdy.ai/ai/img_res/52582a1b039520427b77e1b2697b4447.jpg",
    },
  ];

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategory === "all" || service.category === selectedCategory;
    const matchesPrice =
      service.price >= priceRange[0] && service.price <= priceRange[1];
    const matchesRating =
      selectedRating === 0 || service.rating >= selectedRating;
    return matchesCategory && matchesPrice && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a
                href="https://readdy.ai/home/a69c032c-c222-4d02-8907-58beb7bee794/fdbcff18-bd0e-49c5-b6e2-5580b3e09de0"
                data-readdy="true"
                className="flex items-center"
              >
                <i className="fas fa-tools text-3xl text-indigo-600 mr-2"></i>
                <span className="text-2xl font-bold text-gray-800">
                  RepairPro
                </span>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="https://readdy.ai/home/a69c032c-c222-4d02-8907-58beb7bee794/fdbcff18-bd0e-49c5-b6e2-5580b3e09de0"
                data-readdy="true"
                className="text-gray-600 hover:text-indigo-600"
              >
                Home
              </a>
              <a href="#" className="text-indigo-600 font-semibold">
                Services
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                How It Works
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                Professionals
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                Contact
              </a>
              <button className="!rounded-button bg-indigo-600 text-white px-6 py-2 hover:bg-indigo-700 transition-colors whitespace-nowrap">
                Book Now
              </button>
            </div>
            <button className="md:hidden text-gray-600">
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 bg-indigo-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Professional Repair Services
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              Find the perfect service for your repair needs
            </p>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-none text-gray-700 bg-gray-50"
                  >
                    <option value="all">All Categories</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="hvac">HVAC</option>
                    <option value="carpentry">Carpentry</option>
                  </select>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Enter your location"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-none text-gray-700 bg-gray-50"
                  />
                </div>
                <button className="!rounded-button bg-indigo-600 text-white px-8 py-3 hover:bg-indigo-700 transition-colors whitespace-nowrap">
                  Search Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 bg-white rounded-lg shadow-lg h-fit p-6">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <div className="flex items-center space-x-2">
                  {[0, 4, 4.5, 4.8].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSelectedRating(rating)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedRating === rating
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {rating === 0 ? "All" : rating}+
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-indigo-600">
                        ${service.price}
                      </div>
                      <div className="flex items-center">
                        <div className="flex text-yellow-400 mr-1">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`fas fa-star ${
                                i < Math.floor(service.rating)
                                  ? ""
                                  : "text-gray-300"
                              }`}
                            ></i>
                          ))}
                        </div>
                        <span className="text-gray-600">
                          ({service.reviews})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div>
                        <i className="far fa-clock mr-1"></i>
                        {service.duration}
                      </div>
                      <div>
                        <i className="fas fa-map-marker-alt mr-1"></i>
                        {service.coverage}
                      </div>
                    </div>
                    <button className="!rounded-button w-full bg-indigo-600 text-white py-2 hover:bg-indigo-700 transition-colors whitespace-nowrap">
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Professionals
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
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
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
