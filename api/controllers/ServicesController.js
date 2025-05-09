const Service = require("../models/Service");
const {
  validCategories,
  formatServiceImage,
  uploadServiceImage,
} = require("../utils/functions");

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

    if (location) query.location = { $regex: location, $options: "i" };

    const services = await Service.find(query).populate({
      path: "creator",
      select: "fullName email profileImage",
    });

    if (!services || services.length === 0) {
      return res.status(404).json({ message: "No services found" });
    }

    services.forEach((service) => {
      service.fileUrl = formatServiceImage(service.image, req);
    });

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
    const service = await Service.findById(req.params.id).populate({
      path: "creator",
      select: "fullName email profileImage",
    });

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
const getCreatorServices = async (req, res) => {
  const { id: creatorId } = req.user;
  try {
    const services = await Service.find({ creator: creatorId }).populate(
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
    const { name, description, price, duration, category, coverage, location } =
      req.body;

    if (!validCategories.includes(category)) {
      return res.status(400).json({
        message: `Invalid category. Valid categories are: ${validCategories.join(
          ", "
        )}`,
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imageUrl = await uploadServiceImage(req);

    const service = await Service.create({
      name,
      description,
      price: Number(price),
      duration,
      category,
      creator: req.user.id,
      image: imageUrl,
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
  const { id } = req.params;

  try {
    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Handle image upload
    let imageUrl = service.image;
    if (req.file) {
      imageUrl = await uploadServiceImage(req);
    }

    // Prepare update data
    const updatedServicesData = {
      ...req.body,
      image: imageUrl,
    };

    // Update service
    const updatedService = await Service.findByIdAndUpdate(
      id,
      updatedServicesData,
      {
        new: true,
      }
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
  getCreatorServices,
};
