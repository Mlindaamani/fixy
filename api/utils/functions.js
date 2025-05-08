const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const USERROLE = {
  SERVICEPROVIDER: "serviceProvider",
  CUSTOMER: "customer",
  ADMIN: "admin",
};

const corsConfiguration = {
  cors: {
    origin: `http://localhost:${process.env.CLIENT_APP_PORT}`,
    methods: ["GET", "POST"],
  },
};

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
  });
};

const verifyMongoDbId = (videoId) => {
  return mongoose.Types.ObjectId.isValid(videoId);
};

const startServer = () => {
  console.log(`✔️  Success! Server is running on port: ${process.env.PORT}`);
};

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleString("en-US", options);
};

const validCategories = [
  "plumbing",
  "electrical",
  "hvac",
  "carpentry",
  "cleaning",
  "gardening",
  "pest control",
  "painting",
  "roofing",
  "masonry",
  "welding",
  "landscaping",
  "flooring",
  "remodeling",
  "construction",
  "handyman",
  "appliance repair",
  "moving",
  "security",
  "locksmith",
  "car wash",
  "car detailing",
  "carpentry",
  "home improvement",
  "home repair",
  "home cleaning",
  "home maintenance",
  "home organization",
  "other",
];

module.exports = {
  formatDate,
  corsConfiguration,
  generateAccessToken,
  generateRefreshToken,
  verifyMongoDbId,
  startServer,
  USERROLE,
  validCategories,
};
