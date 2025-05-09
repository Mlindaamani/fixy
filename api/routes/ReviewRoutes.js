const express = require("express");
const ReviewRouter = express.Router();
const {
  createReview,
  getReviewsByService,
  deleteReview,
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

ReviewRouter.delete(
  "/:id",
  userIsAuthenticatedMiddleware,
  restrictTo("customer"),
  deleteReview
);

module.exports = ReviewRouter;
