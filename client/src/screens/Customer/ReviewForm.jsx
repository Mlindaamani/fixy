import React, { useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import { useReviewStore } from "../../stores/reviewStore";

const ReviewForm = ({ serviceId }) => {
  const { createReview, isLoading } = useReviewStore();
  const { user } = useAuthStore();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      setError("Please select a rating between 1 and 5");
      return;
    }
    setError("");
    try {
      await createReview(serviceId, { rating, comment });
      setRating(0);
      setComment("");
    } catch (err) {
      setError(err.message || "Failed to submit review");
    }
  };

  if (user?.role !== "customer") {
    // Hide form for non-customers
    return null;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto mt-6">
      <h3 className="text-lg font-semibold text-gray-600 mb-4">
        Submit a Review
      </h3>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 text-sm font-medium mb-1">
            Rating
          </label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                <i className="fas fa-star"></i>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-gray-600 text-sm font-medium mb-1">
            Comment (Optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-2.5 border rounded-lg text-gray-600 text-sm"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 text-sm disabled:opacity-50"
        >
          {isLoading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
