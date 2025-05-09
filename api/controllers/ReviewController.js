const Review = require("../models/Review");
const Service = require("../models/Service");

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const createReview = async (req, res) => {
  try {
    const { serviceId, rating, comment } = req.body;

    // Validate service exists
    const service = await Service.findById(serviceId);
    if (!service || service.status !== "active") {
      return res
        .status(404)
        .json({ message: "Service not found or not active" });
    }

    // Create review
    const review = await Review.create({
      service: serviceId,
      user: req.user.id,
      rating,
      comment,
    });

    return res.status(201).json(review);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this service" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getReviewsByService = async (req, res) => {
  //Pagination
  // const { page = 1, limit = 10 } = req.query;
  // const reviews = await Review.find({ service: serviceId })
  //   .populate("user", "fullName")
  //   .sort({ created_at: -1 })
  //   .skip((page - 1) * limit)
  //   .limit(Number(limit));
  try {
    const { serviceId } = req.params;
    const reviews = await Review.find({ service: serviceId })
      .populate("user", "fullName")
      .sort({ created_at: -1 });

    if (!reviews || reviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this service" });
    }

    return res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    if (review.user.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this review" });
    }
    await review.remove();
    return res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createReview,
  getReviewsByService,
  deleteReview,
};
