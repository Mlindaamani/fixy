import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useServiceStore } from "../../stores/serviceStore";
import { useReviewStore } from "../../stores/reviewStore";
import ReviewForm from "../Customer/ReviewForm";
import LoadingSpinner from "../../components/Spinner";

const ServiceDetails = () => {
  const {
    services,
    isLoading: serviceLoading,
    getActiveServices,
  } = useServiceStore();

  const { reviews, getReviews, isLoading: reviewLoading } = useReviewStore();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getActiveServices();
    getReviews(id);
  }, [id, getReviews, getActiveServices]);

  const service = services.find((s) => s._id === id);

  if (serviceLoading || reviewLoading) return <LoadingSpinner />;
  if (!service)
    return <p className="text-gray-600 text-center">Service not found.</p>;

  return (
    <div className="container min-h-screen py-6">
      <button
        onClick={() => navigate("/services")}
        className="mb-6 text-indigo-600 hover:underline text-sm"
      >
        &larr; Back to Services
      </button>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">
              {service.name}
            </h2>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-indigo-600 font-bold text-xl">
                  ${service.price}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star ${
                        i < Math.floor(service.rating) ? "" : "text-gray-300"
                      }`}
                    ></i>
                  ))}
                </span>
                <span className="text-gray-600">
                  ({service.reviews} reviews)
                </span>
              </div>
              <div>
                <i className="far fa-clock mr-1 text-gray-600"></i>
                {service.duration}
              </div>
              <div>
                <i className="fas fa-map-marker-alt mr-1 text-gray-600"></i>
                {service.coverage}
              </div>
              <div>
                <span className="text-gray-600">
                  Category: {service.category}
                </span>
              </div>
              <div>
                <span className="text-gray-600">
                  Location: {service.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-600 mb-4">Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white shadow-lg rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 font-medium">
                    {review.user.fullName}
                  </span>
                  <span className="text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${
                          i < review.rating ? "" : "text-gray-300"
                        }`}
                      ></i>
                    ))}
                  </span>
                </div>
                {review.comment && (
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                )}
                <p className="text-gray-500 text-xs mt-2">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <ReviewForm serviceId={id} />
    </div>
  );
};

export default ServiceDetails;
