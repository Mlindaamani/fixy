const express = require("express");

const ServicesRouter = express.Router();

const {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
  updateServiceStatus,
} = require("../controllers/ServicesController");

const {
  userIsAuthenticatedMiddleware,
  restrictTo,
} = require("../middlewares/authMiddleware");

ServicesRouter.get("/", getServices);
ServicesRouter.get("/:id", getServiceById);

// Protected routes
ServicesRouter.post(
  "/",
  userIsAuthenticatedMiddleware,
  restrictTo("serviceProvider"),
  createService
);

ServicesRouter.put(
  "/:id",
  userIsAuthenticatedMiddleware,
  restrictTo("serviceProvider"),
  updateService
);

ServicesRouter.delete(
  "/:id",
  userIsAuthenticatedMiddleware,
  restrictTo("serviceProvider"),
  deleteService
);

ServicesRouter.patch(
  "/:id/status",
  userIsAuthenticatedMiddleware,
  restrictTo("admin"),
  updateServiceStatus
);

module.exports = { ServicesRouter };
