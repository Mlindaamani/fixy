import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useServiceStore } from "../../stores/serviceStore";
import LoadingSpinner from "../../components/Spinner";
import { useDebounce } from "use-debounce";

const Services = () => {
  const { services, myServices, deleteService, isLoading, deletingServices } =
    useServiceStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  useEffect(() => {
    myServices();
  }, [myServices]);

  const filteredServices = services.filter((service) =>
    [service.name, service.category, service.location, service.status].some(
      (field) =>
        field.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    )
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService(id);
      } catch (error) {
        console.error("Failed to delete service:", error);
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container min-h-screen py-6">
      {/* Header */}
      <div className="bg-white flex flex-wrap justify-between items-center shadow-lg mb-6 p-4 rounded-lg gap-4">
        <div className="flex items-center">
          <div className="w-10 h-10 flex justify-center items-center bg-blue-100 rounded-full">
            <i className="fa-solid fa-briefcase text-indigo-600"></i>
          </div>
          <h5 className="text-indigo-600 font-semibold ml-3 text-lg">
            My Services
          </h5>
        </div>
        <div className="flex-1 max-w-md mx-4">
          <input
            type="text"
            placeholder="Search by name, category, location, or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 border rounded-lg text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <button
          onClick={() => navigate("/provider/services/new")}
          className="bg-indigo-600 text-white px-4 py-2 !rounded-lg hover:bg-indigo-700 text-sm"
        >
          Add Service
        </button>
      </div>

      {/* Service Grid */}
      {filteredServices.length === 0 ? (
        <p className="text-gray-600 text-center">No services found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:-translate-y-2"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-indigo-600 font-bold">
                    Tsh {service.price}
                  </span>
                  <span className="text-gray-600 text-sm">
                    {service.duration}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600 text-sm">
                    {service.category}
                  </span>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">
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
                    </span>
                    <span className="text-gray-600 text-sm">
                      ({service.reviews})
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <span>
                    <i className="fas fa-map-marker-alt mr-1"></i>
                    {service.location}
                  </span>
                  <span
                    className={`p-1 text-sm font-medium !rounded-full ${
                      service.status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {service.status === "active" ? "Active" : "Pending"}
                  </span>
                </div>
                <div className="flex space-x-2 gap-2">
                  <button
                    onClick={() =>
                      navigate(`/provider/services/${service._id}/edit`)
                    }
                    className="flex-1 bg-indigo-600 text-white py-2 !rounded-lg hover:bg-indigo-700 text-sm"
                  >
                    Update
                  </button>

                  <button
                    disabled={deletingServices[service._id]}
                    onClick={() => handleDelete(service._id)}
                    className="flex-1 bg-red-600 text-white py-2 !rounded-lg hover:bg-red-700 text-sm disabled:opacity-50 flex items-center justify-center"
                    aria-label={`Delete ${service.name} service`}
                  >
                    {deletingServices[service._id] ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-2 text-white"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                        Deleting...
                      </span>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
