const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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

module.exports = {
  formatDate,
  corsConfiguration,
  generateAccessToken,
  generateRefreshToken,
  verifyMongoDbId,
  startServer,
};
