const express = require("express");
const {
  userIsAuthenticatedMiddleware,
} = require("../middlewares/AuthMiddleware");
const {
  getServiceProviderAnalytics,
} = require("../controllers/Analytics/Analytics");
const {
  getAdminAnalytics,
} = require("../controllers/Analytics/AdminAnalytics");
const {
  getCustomerAnalytics,
} = require("../controllers/Analytics/CustomerAnalytics");

const AnalyticsRouter = express.Router();

AnalyticsRouter.get(
  "/customer",
  userIsAuthenticatedMiddleware,
  getCustomerAnalytics
);

AnalyticsRouter.get(
  "/provider",
  userIsAuthenticatedMiddleware,
  getServiceProviderAnalytics
);

AnalyticsRouter.get("/admin", userIsAuthenticatedMiddleware, getAdminAnalytics);

module.exports = { AnalyticsRouter };
