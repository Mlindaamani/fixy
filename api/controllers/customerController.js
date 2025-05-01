const Customer = require("../models/Customer");

const getCustomers = async (_req, res) => {
  try {
    const customer = await Customer.find().populate(
      "user",
      "fullName phoneNumber, isVerified, email"
    );

    if (!customer || customer.length === 0) {
      return res.status(404).json({ message: "No service providers found" });
    }

    return res.status(200).json(customer);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateCustomerProfile = async (req, res) => {
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
    const customer = await Customer.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json({ message: "Profile updated successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findById(id).populate(
      "user",
      "fullName phoneNumber profileImage email"
    );

    if (!customer) {
      return res.status(404).json({ message: "Service provider not found" });
    }

    return res.status(200).json(customer);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getCustomerById,
  updateCustomerProfile,
  getCustomers,
};
