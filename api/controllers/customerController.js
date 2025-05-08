const Customer = require("../models/Customer");

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
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

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const updateCustomerProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const customerUpdate = req.body;

    console.lo(req.body);

    const customer = await Customer.findByIdAndUpdate(
      id,
      { $set: customerUpdate },
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({ error: "Customer not found." });
    }
    res.status(200).json({ message: "Profile updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
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
