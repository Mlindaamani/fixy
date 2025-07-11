const express = require("express");
const {
  getServiceProviders,
  getServiceProviderById,
  updateServiceProviderProfile,
  getProviderServices,
} = require("../controllers/ServiceProviderController");

const ServiceProviderRouter = express.Router();

ServiceProviderRouter.get("/services/:providerId", getProviderServices);
ServiceProviderRouter.get("/", getServiceProviders);
ServiceProviderRouter.get("/:id", getServiceProviderById);
ServiceProviderRouter.put("/profile-update/:id", updateServiceProviderProfile);
ServiceProviderRouter.put("/profile-update/:id", updateServiceProviderProfile);

module.exports = { ServiceProviderRouter };
