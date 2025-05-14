const express = require("express");

const ServicesRouter = express.Router();

const {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
  updateServiceStatus,
  getCreatorServices,
} = require("../controllers/ServicesController");

const {
  userIsAuthenticatedMiddleware,
  restrictTo,
} = require("../middlewares/AuthMiddleware");

const { uploadServices } = require("../middlewares/FileUploadMiddleware");

ServicesRouter.get("/", getServices);
ServicesRouter.get("/:id", getServiceById);

// Protected routes
ServicesRouter.post(
  "/",
  userIsAuthenticatedMiddleware,
  restrictTo("serviceProvider"),
  uploadServices.single("serviceImage"),
  createService
);

ServicesRouter.get(
  "/creator/my-services",
  userIsAuthenticatedMiddleware,
  getCreatorServices
);

ServicesRouter.put(
  "/:id",
  userIsAuthenticatedMiddleware,
  restrictTo("serviceProvider"),
  uploadServices.single("serviceImage"),
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
