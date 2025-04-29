import React, { useState } from "react";
import { Footer } from "../components/Footer";
import compressiveServices from "../lib/compressiveServices";

export const FixyServices = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  const filteredServices = compressiveServices.filter((service) => {
    const matchesCategory =
      selectedCategory === "all" || service.category === selectedCategory;

    const matchesPrice =
      service.price >= priceRange[0] && service.price <= priceRange[1];

    const matchesRating =
      selectedRating === 0 || service.rating >= selectedRating;

    return matchesCategory && matchesPrice && matchesRating;
  });

  return (
    <div className="min-h-screen p-0">
      <div className="pt-24 pb-12 bg-indigo-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mt-5">
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
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
