const express = require("express");
const {
  getServiceProviders,
  getServiceProviderById,
  updateServiceProviderProfile,
} = require("../controllers/ServiceProviderController");

const serviceProviderRouter = express.Router();

serviceProviderRouter.get("/", getServiceProviders);
serviceProviderRouter.get("/:id", getServiceProviderById);
serviceProviderRouter.put("/profile-update/:id", updateServiceProviderProfile);
serviceProviderRouter.put("/profile-update/:id", updateServiceProviderProfile);
module.exports = { serviceProviderRouter };
