const express = require("express");
const ReviewRouter = express.Router();
const {
  createReview,
  getReviewsByService,
  deleteReview,
  updateReview,
} = require("../controllers/ReviewController");

const {
  userIsAuthenticatedMiddleware,
  restrictTo,
} = require("../middlewares/AuthMiddleware");

ReviewRouter.post(
  "/",
  userIsAuthenticatedMiddleware,
  restrictTo("customer"),
  createReview,
  deleteReview
);

ReviewRouter.get("/service/:serviceId", getReviewsByService);

ReviewRouter.put(
  "/:id",
  userIsAuthenticatedMiddleware,
  restrictTo("customer"),
  updateReview
);

ReviewRouter.delete(
  "/:id",
  userIsAuthenticatedMiddleware,
  restrictTo("customer"),
  deleteReview
);

module.exports = ReviewRouter;
