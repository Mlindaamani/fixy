const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const corsConfiguration = {
  cors: {
    origin: `${process.env.CLIENT_APP_URL}:${process.env.CLIENT_APP_PORT}`,
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

const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const getVerificationTokenExpiration = () => {
  return Date.now() + 3600000;
};

const generatePasswordResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const getPasswordTokenExpiration = () => {
  return Date.now() + 3600000;
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  return await bcrypt.hash(password, salt);
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
  generateVerificationToken,
  generatePasswordResetToken,
  getPasswordTokenExpiration,
  getVerificationTokenExpiration,
  verifyMongoDbId,
  startServer,
  hashPassword,
};
