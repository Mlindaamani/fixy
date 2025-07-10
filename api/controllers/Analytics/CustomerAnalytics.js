const Booking = require("../../models/Booking");
const moment = require("moment");

const getCustomerAnalytics = async (req, res) => {
  try {
    const customerId = req.user._id;

    // Total Bookings
    const totalBookings = await Booking.countDocuments({
      customer: customerId,
    });

    // Total Spent
    const spentResult = await Booking.aggregate([
      { $match: { customer: customerId, status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalSpent = spentResult[0]?.total || 0;

    // Providers Contacted
    const distinctProviders = await Booking.distinct("provider", {
      customer: customerId,
    });
    const providersContacted = distinctProviders.length;

    // Average Service Rating
    const ratingResult = await Booking.aggregate([
      { $match: { customer: customerId } },
      {
        $lookup: {
          from: "services",
          localField: "service",
          foreignField: "_id",
          as: "serviceData",
        },
      },
      { $unwind: "$serviceData" },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$serviceData.rating" },
        },
      },
    ]);
    const averageRating = ratingResult[0]?.avgRating || 0;

    // Spending Over Time (last 6 months)
    const spendingOverTimeRaw = await Booking.aggregate([
      {
        $match: {
          customer: customerId,
          status: "completed",
          createdAt: { $gte: moment().subtract(6, "months").toDate() },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          amount: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const spendingOverTime = spendingOverTimeRaw.map((r) => ({
      month: moment()
        .month(r._id - 1)
        .format("MMM"),
      amount: r.amount,
    }));

    // Bookings by Service Category
    const bookingsByCategoryRaw = await Booking.aggregate([
      { $match: { customer: customerId } },
      {
        $lookup: {
          from: "services",
          localField: "service",
          foreignField: "_id",
          as: "serviceData",
        },
      },
      { $unwind: "$serviceData" },
      { $group: { _id: "$serviceData.category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    const bookingsByCategory = bookingsByCategoryRaw.map((r) => ({
      category: r._id,
      count: r.count,
    }));

    // Recent Bookings
    const recentBookingsRaw = await Booking.find({ customer: customerId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("provider", "fullName")
      .populate("service", "name")
      .lean();
    const recentBookings = recentBookingsRaw.map((b) => ({
      id: b._id,
      providerName: b.provider.fullName,
      serviceName: b.service.name,
      date: b.createdAt,
      amount: b.amount,
      status: b.status,
      conversationId: b.conversationId,
    }));

    return res.json({
      totalBookings,
      totalSpent,
      providersContacted,
      averageRating,
      spendingOverTime,
      bookingsByCategory,
      recentBookings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

module.exports = { getCustomerAnalytics };
