import React, { useEffect, useState } from "react";
import { useProfileStore } from "../../stores/profileStore";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";
import { USERROLE } from "../../utils/functions";
import ProfileModal from "./ProfileModal";

const ProfessionalsListing = () => {
  const navigate = useNavigate();
  const [selectedServiceType, setSelectedServiceType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedRating, setSelectedRating] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [experienceLevel, setExperienceLevel] = useState("all");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const { user, isAuthenticated } = useAuthStore();

  const {
    providers,
    getServiceProviders,
    createConversation,
    creatingConversation,
  } = useProfileStore();

  useEffect(() => {
    getServiceProviders();
  }, [getServiceProviders]);

  const handleChatClick = async (professionalId) => {
    await createConversation(professionalId, navigate);
  };

  const filteredProfessionals = providers
    .filter((pro) => {
      const matchesSearch =
        pro.user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pro.title.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesService =
        selectedServiceType === "all" ||
        pro.specialties.some((s) =>
          s.toLowerCase().includes(selectedServiceType.toLowerCase())
        );

      const matchesLocation =
        !selectedLocation ||
        pro.location.toLowerCase().includes(selectedLocation.toLowerCase());

      const matchesRating =
        selectedRating === "all" || pro.rating >= parseInt(selectedRating);

      const matchesExperience =
        experienceLevel === "all" ||
        (experienceLevel === "junior" && parseInt(pro.experience) < 5) ||
        (experienceLevel === "mid" &&
          parseInt(pro.experience) >= 5 &&
          parseInt(pro.experience) < 10) ||
        (experienceLevel === "senior" && parseInt(pro.experience) >= 10);

      const matchesPrice =
        pro.hourlyRate >= priceRange[0] && pro.hourlyRate <= priceRange[1];

      return (
        matchesSearch &&
        matchesService &&
        matchesLocation &&
        matchesRating &&
        matchesExperience &&
        matchesPrice
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "experience":
          return parseInt(b.experience) - parseInt(a.experience);
        case "price":
          return a.hourlyRate - b.hourlyRate;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-600 text-white pt-24 pb-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">
            Find Your Perfect Professional
          </h1>
          <p className="text-xl mb-8">
            Connect with skilled experts in your area
          </p>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search providers..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-none text-sm text-gray-800"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search providers"
                />
              </div>
              <div className="relative">
                <i className="fas fa-map-marker-alt absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-none text-sm text-gray-800"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  aria-label="Filter by location"
                />
              </div>
              <div className="relative">
                <i className="fas fa-tools absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <select
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-none text-sm text-gray-800 appearance-none cursor-pointer"
                  value={selectedServiceType}
                  onChange={(e) => setSelectedServiceType(e.target.value)}
                  aria-label="Filter by service type"
                >
                  <option value="all">All Services</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="hvac">HVAC</option>
                  <option value="carpentry">Carpentry</option>
                </select>
              </div>
              <div className="relative">
                <i className="fas fa-sort absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <select
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-none text-sm text-gray-800 appearance-none cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort providers"
                >
                  <option value="rating">Sort by Rating</option>
                  <option value="experience">Sort by Experience</option>
                  <option value="price">Sort by Price</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>

              <div className="mb-6">
                <h4 className="font-medium mb-2">Rating</h4>
                <select
                  className="w-full px-4 py-2 rounded-lg border-none text-sm text-gray-800"
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  aria-label="Filter by rating"
                >
                  <option value="all">All Ratings</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                </select>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-2">Experience Level</h4>
                <select
                  className="w-full px-4 py-2 rounded-lg border-none text-sm text-gray-800"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  aria-label="Filter by experience level"
                >
                  <option value="all">All Levels</option>
                  <option value="junior">0-5 years</option>
                  <option value="mid">5-10 years</option>
                  <option value="senior">10+ years</option>
                </select>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-2">Price Range ($/hour)</h4>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([parseInt(e.target.value), priceRange[1]])
                    }
                    className="w-24 px-3 py-2 rounded-lg border-none text-sm text-gray-800"
                    min="0"
                    aria-label="Minimum price"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-24 px-3 py-2 rounded-lg border-none text-sm text-gray-800"
                    min="0"
                    aria-label="Maximum price"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedServiceType("all");
                  setSelectedRating("all");
                  setExperienceLevel("all");
                  setPriceRange([0, 100000]);
                  setSearchQuery("");
                  setSelectedLocation("");
                }}
                className="w-full bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                aria-label="Clear all filters"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProfessionals.map((pro) => (
                <div
                  key={pro.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={pro?.user?.profileImage}
                      alt={pro?.user?.fullName}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-indigo-600">
                      {pro.availability}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">
                          {pro?.user?.fullName}
                        </h3>
                        <p className="text-indigo-600 font-medium">
                          {pro.title}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">
                          Tsh {pro.hourlyRate}/hr
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="flex text-yellow-400 mr-1">
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={`fas fa-star ${
                                  i < Math.floor(pro.rating)
                                    ? ""
                                    : "text-gray-300"
                                }`}
                              ></i>
                            ))}
                          </div>
                          <span className="text-gray-600 text-sm">
                            ({pro.reviews})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center text-gray-600 mb-2">
                        <i className="fas fa-map-marker-alt mr-2"></i>
                        <span>{pro.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <i className="fas fa-clock mr-2"></i>
                        <span>{pro.yearsOfExperience} experience</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {pro.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        onClick={() => {
                          setSelectedProfessional(pro);
                          setShowProfileModal(true);
                        }}
                        className="flex-1 bg-white border-2 border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
                      >
                        View Profile
                      </button>
                      <button
                        disabled={
                          user?.role === USERROLE.SERVICEPROVIDER ||
                          creatingConversation ||
                          !isAuthenticated
                        }
                        onClick={() => handleChatClick(pro.user._id)}
                        className={`flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors ${
                          user?.role === USERROLE.SERVICEPROVIDER ||
                          creatingConversation ||
                          !isAuthenticated
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <i className="fas fa-paper-plane mr-2"></i>
                        {creatingConversation ? "Loading..." : "Chat"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showProfileModal && selectedProfessional && (
        <ProfileModal
          selectedProfessional={selectedProfessional}
          setShowProfileModal={setShowProfileModal}
        />
      )}
    </div>
  );
};

export default ProfessionalsListing;
