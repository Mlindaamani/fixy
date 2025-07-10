const Booking = require("../../models/Booking");
const User = require("../../models/User");
const moment = require("moment");

const getServiceProviderAnalytics = async (req, res) => {
  try {
    const providerId = req.user._id;

    // Fetch ServiceProvider
    const provider = await User.findById(providerId).populate("profile");
    if (!provider || provider.role !== "serviceProvider") {
      return res.status(403).json({ message: "Access denied" });
    }
    const serviceProvider = provider.profile;

    // Total Jobs
    const totalJobs = serviceProvider.totalJobCompleted || 0;

    // Total Revenue
    const revenueResult = await Booking.aggregate([
      { $match: { provider: providerId, status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    // Average Rating
    const averageRating = serviceProvider.rating || 0;

    // Unique Customers
    const uniqueCustomers = await Booking.countDocuments({
      provider: providerId,
    }).distinct("customer");

    // Revenue Over Time (last 6 months)
    const revenueOverTimeRaw = await Booking.aggregate([
      {
        $match: {
          provider: providerId,
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
    const revenueOverTime = revenueOverTimeRaw.map((r) => ({
      month: moment()
        .month(r._id - 1)
        .format("MMM"),
      amount: r.amount,
    }));

    // Jobs by Service Category
    const jobsByCategoryRaw = await Booking.aggregate([
      { $match: { provider: providerId, status: "completed" } },
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
    const jobsByCategory = jobsByCategoryRaw.map((r) => ({
      category: r._id,
      count: r.count,
    }));

    // Recent Bookings
    const recentBookingsRaw = await Booking.find({ provider: providerId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("customer", "fullName")
      .populate("service", "name")
      .lean();
    const recentBookings = recentBookingsRaw.map((b) => ({
      id: b._id,
      customerName: b.customer.fullName,
      serviceName: b.service.name,
      date: b.createdAt,
      amount: b.amount,
      status: b.status,
      conversationId: b.conversationId,
    }));

    return res.json({
      totalJobs,
      totalRevenue,
      averageRating,
      uniqueCustomers: uniqueCustomers.length,
      revenueOverTime,
      jobsByCategory,
      recentBookings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

module.exports = { getServiceProviderAnalytics };
