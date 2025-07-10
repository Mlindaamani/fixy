const User = require("../../models/User");
const Service = require("../../models/Service");
const Booking = require("../../models/Booking");
const Conversation = require("../../models/Conversation");
const moment = require("moment");

const getAdminAnalytics = async (req, res) => {
  try {
    const { role } = req.query;

    // Total Users
    const userQuery = role && role !== "all" ? { role } : {};
    const totalUsers = await User.countDocuments(userQuery);

    // Total Services
    const totalServices = await Service.countDocuments();

    // Total Revenue
    const revenueResult = await Booking.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    // Active Conversations
    const activeConversations = await Conversation.countDocuments({
      isActive: true,
    });

    // User Growth (last 6 months)
    const userGrowthRaw = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: moment().subtract(6, "months").toDate() },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const userGrowth = userGrowthRaw.map((r) => ({
      month: moment()
        .month(r._id - 1)
        .format("MMM"),
      count: r.count,
    }));

    // Users List
    const rawUsers = await User.find(userQuery).populate("profile").lean();
    const users = await Promise.all(
      rawUsers.map(async (u) => {
        const services =
          u.role === "serviceProvider"
            ? await Service.find({ creator: u._id }).lean()
            : [];
        return {
          id: u._id,
          fullName: u.fullName,
          email: u.email,
          role: u.role,
          profileImage: u.profileImage,
          profile: u.profile,
          services: services.map((s) => ({
            id: s._id,
            name: s.name,
            category: s.category,
            price: s.price,
            status: s.status,
          })),
        };
      })
    );

    // Services List
    const rawServices = await Service.find()
      .populate("creator", "fullName")
      .lean();
    const services = rawServices.map((s) => ({
      id: s._id,
      name: s.name,
      providerName: s.creator.fullName,
      category: s.category,
      price: s.price,
      status: s.status,
    }));

    return res.json({
      totalUsers,
      totalServices,
      totalRevenue,
      activeConversations,
      userGrowth,
      users,
      services,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

module.exports = { getAdminAnalytics };
