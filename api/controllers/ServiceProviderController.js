const ServiceProvider = require("../models/ServiceProvider");
const Service = require("../models/Service");
const { formatImageRepresentation } = require("../utils/helpers");

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getServiceProviders = async (req, res) => {
  try {
    const serviceProviders = await ServiceProvider.find({
      profile_status: "approved",
    })
      .populate("user", "fullName phoneNumber, profileImage")
      .populate("portfolio")
      .populate("reviews");

    if (!serviceProviders || serviceProviders.length === 0) {
      return res.status(404).json({ message: "No ServiceProvider found" });
    }

    serviceProviders.map(
      (provider) =>
        (provider.user.profileImage = formatImageRepresentation(
          req,
          provider.user.profileImage
        ))
    );

    return res.status(200).json(serviceProviders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const updateServiceProviderProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const allowedUpdates = [
      "title",
      "bio",
      "serviceCategory",
      "specialties",
      "yearsOfExperience",
      "location",
      "availability",
      "hourlyRate",
      "certifications",
    ];

    const updateKeys = Object.keys(updates);
    const isValidOperation = updateKeys.every((key) =>
      allowedUpdates.includes(key)
    );

    if (!isValidOperation) {
      return$res.status(400).json({ error: "Invalid updates." });
    }
    const serviceProvider = await ServiceProvider.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!serviceProvider) {
      return res.status(404).json({ error: "Service provider not found." });
    }
    res.status(200).json({ message: "Profile updated successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getServiceProviderById = async (req, res) => {
  try {
    const { id } = req.params;

    const serviceProvider = await ServiceProvider.findById(id)
      .populate("user", "fullName phoneNumber profileImage")
      .populate("portfolio")
      .populate("reviews");

    if (!serviceProvider) {
      return res.status(404).json({ message: "Service provider not found" });
    }

    return res.status(200).json(serviceProvider);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getProviderServices = async (req, res) => {
  try {
    const services = await Service.find({
      creator: req.params.providerId,
      status: "active",
    }).select("name price category");

    return res.json(services);
  } catch (error) {
    console.error("Error fetching provider services:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

module.exports = {
  getServiceProviders,
  updateServiceProviderProfile,
  getServiceProviderById,
  getProviderServices,
};
