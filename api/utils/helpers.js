const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { IMAGE_TRANSFORMATIONS } = require("./constants");
const { cloudinary } = require("../config/cloudinary");

const bcrypt = require("bcryptjs");

const hashPassword = async (plainTextPassword) => {
  try {
    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
      throw new Error('Password must be a non-empty string');
    }
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error(`Hashing failed: ${error.message}`);
  }
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

const verifyMongoDbId = (provided_id) => {
  return mongoose.Types.ObjectId.isValid(provided_id);
};

const startServer = () => {
  console.log(`✔️ Success! Server is running on port: ${process.env.PORT}`);
};

const formatDate = (IsoDate) => {
  const date = new Date(IsoDate);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleString("en-US", options);
};

const formatImageRepresentation = (req, assetUrl) => {
  const host = req.get("host");
  const protocol = req.protocol;
  if (assetUrl && assetUrl.includes("https://res.cloudinary.com")) {
    return assetUrl;
  }
  return `${protocol}://${host}/${assetUrl}`;
};

const uploadToCloudinaryOrToLocalServer = async (req) => {
  try {
    if (process.env.NODE_ENV === "production") {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder:
          req.file.fieldname === "serviceImage"
            ? process.env.CLOUDINARY_SERVICES_FOLDER
            : process.env.CLOUDINARY_PROFILE_FOLDER,
        resource_type: "auto",
        transformation: [IMAGE_TRANSFORMATIONS],
      });

      return uploadResult.secure_url;
    }

    if (req.file.fieldname && req.file.fieldname === "serviceImage") {
      return `uploads/services/${req.file.filename}`;
    } else if (req.file.fieldname && req.file.fieldname === "profileImage") {
      return `uploads/profiles/${req.file.filename}`;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = {
  formatDate,
  generateAccessToken,
  generateRefreshToken,
  verifyMongoDbId,
  startServer,
  formatImageRepresentation,
  uploadToCloudinaryOrToLocalServer,
};
