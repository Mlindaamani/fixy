const Booking = require("../models/Booking");
const Service = require("../models/Service");
const Conversation = require("../models/Conversation");
const ServiceProvider = require("../models/ServiceProvider");

const createBooking = async (req, res) => {
  try {
    const { serviceId, providerId, conversationId } = req.body;
    const customerId = req.user._id;

    // Validate Service
    const service = await Service.findById(serviceId);
    if (!service || service.status !== "active") {
      return res
        .status(400)
        .json({ message: "Service not found or not active" });
    }

    // Validate Provider
    const provider = await ServiceProvider.findOne({ user: providerId });
    if (!provider) {
      return res.status(400).json({ message: "Service provider not found" });
    }

    // Validate Conversation (if provided)
    if (conversationId) {
      const conversation = await Conversation.findById(conversationId);
      if (!conversation || !conversation.isActive) {
        return res
          .status(400)
          .json({ message: "Invalid or inactive conversation" });
      }
    }

    // Create Booking
    const booking = await Booking.create({
      customer: customerId,
      provider: providerId,
      service: serviceId,
      conversationId,
      amount: service.price,
      status: "pending",
    });

    // If created as completed (rare case), increment completed jobs
    if (booking.status === "completed") {
      await ServiceProvider.findOneAndUpdate(
        { user: providerId },
        { $inc: { totalJobCompleted: 1 } }
      );
    }

    return res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

const getBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;

    const query =
      role === "customer"
        ? { customer: userId }
        : role === "serviceProvider"
        ? { provider: userId }
        : {}; // Admin sees all

    const bookings = await Booking.find(query)
      .populate("customer", "fullName")
      .populate("provider", "fullName")
      .populate("service", "name")
      .sort({ createdAt: -1 });

    return res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

module.exports = { createBooking, getBookings };
