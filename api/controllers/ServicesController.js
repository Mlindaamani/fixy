const Service = require("../models/Service");
const { validCategories } = require("../utils/functions");

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getServices = async (req, res) => {
  try {
    const { category, priceMin, priceMax, rating, location } = req.query;

    const query = { status: "active" };
    if (category && category !== "all") query.category = category;
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = Number(priceMin);
      if (priceMax) query.price.$lte = Number(priceMax);
    }
    if (rating) query.rating = { $gte: Number(rating) };
    // Case-insensitive match
    if (location) query.location = { $regex: location, $options: "i" };

    const services = await Service.find(query).populate(
      "creator",
      "fullName email"
    );

    if (!services || services.length === 0) {
      return res.status(404).json({ message: "No services found" });
    }

    return res.status(200).json(services);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      "creator",
      "fullName email"
    );

    if (!service || service.status !== "active") {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.status(200).json(service);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getServiceByCreator = async (req, res) => {
  try {
    const services = await Service.find({ creator: req.user.id }).populate(
      "creator",
      "fullName email"
    );

    if (!services || services.length === 0) {
      return res.status(404).json({ message: "No services found" });
    }

    return res.status(200).json(services);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const createService = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      duration,
      category,
      image,
      coverage,
      location,
    } = req.body;

    if (!validCategories.includes(category)) {
      return res.status(400).json({
        message: `Invalid category. Valid categories are: ${validCategories.join(
          ", "
        )}`,
      });
    }

    const service = await Service.create({
      name,
      description,
      price,
      duration,
      category,
      creator: req.user.id,
      image,
      coverage,
      location,
      status: "pending",
    });

    return res.status(201).json(service);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Service with this name already exists",
      });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (service.creator.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this service" });
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      // Reset to pending on update
      { ...req.body, status: "pending" },
      { new: true }
    );

    return res.status(200).json(updatedService);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (service.creator.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this service" });
    }

    await service.remove();

    return res.status(200).json({ message: "Service deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const updateServiceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    return res.status(200).json(service);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  updateServiceStatus,
  getServiceByCreator,
};
