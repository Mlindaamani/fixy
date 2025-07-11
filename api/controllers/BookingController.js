const Booking = require("../models/Booking");
const Service = require("../models/Service");
const Conversation = require("../models/Conversation");
const ServiceProvider = require("../models/ServiceProvider");

const createBooking = async (req, res) => {
  try {
    const { serviceId, providerId } = req.body;
    const customerId = req.user.id;

    // Only customers can book
    if (req.user.role !== "customer") {
      return res
        .status(403)
        .json({ message: "Only customers can create bookings" });
    }

    // Validate service
    const service = await Service.findById(serviceId);
    if (!service || service.status !== "active") {
      return res
        .status(400)
        .json({ message: "Service not found or not active" });
    }

    // Validate provider and service ownership
    const provider = await ServiceProvider.findOne({ user: providerId });
    if (!provider || service.creator.toString() !== providerId.toString()) {
      return res.status(400).json({
        message: "Invalid provider or service not offered by this provider",
      });
    }

    // Check or create active conversation
    let conversation = await Conversation.findOne({
      provider: providerId,
      customer: customerId,
      isActive: true,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        provider: providerId,
        customer: customerId,
        lastMessageAt: new Date(),
        isActive: true,
      });
    }

    // Create booking
    const booking = await Booking.create({
      customer: customerId,
      provider: providerId,
      service: serviceId,
      conversationId: conversation._id,
      amount: service.price,
      status: "pending",
    });

    return res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

const getBookings = async (req, res) => {
  try {
    const { id: userId, role } = req.user;
    const { status } = req.query;

    const allowedStatuses = ["pending", "confirmed", "completed", "cancelled"];
    const query = {};

    if (role === "customer") {
      query.customer = userId;
    } else if (role === "serviceProvider") {
      query.provider = userId;
    } // Admin sees all

    if (status && allowedStatuses.includes(status)) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate("customer", "fullName")
      .populate("provider", "fullName")
      .populate("service", "name")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.customer.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to cancel this booking" });
    }

    if (booking.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending bookings can be cancelled" });
    }

    booking.status = "cancelled";
    await booking.save();

    return res.json({
      message: "Booking cancelled successfully",
      status: booking.status,
    });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

module.exports = { createBooking, getBookings, cancelBooking };
