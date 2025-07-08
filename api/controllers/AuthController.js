const jwt = require("jsonwebtoken");
const { USERROLE } = require("../utils/constants");
const {
  generateAccessToken,
  generateRefreshToken,
  uploadToCloudinaryOrToLocalServer,
  formatImageRepresentation,
} = require("../utils/helpers");

const Customer = require("../models/Customer");
const User = require("../models/User");
const ServiceProvider = require("../models/ServiceProvider");

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getSidebarUsers = async (req, res) => {
  const { id: userId } = req.user;

  try {
    const filteredUsers = await User.find({ _id: { $ne: userId } })
      .select("-password")
      .sort({ username: -1 });
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
    });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const register = async (req, res) => {
  try {
    const {
      email,
      password,
      fullName,
      phoneNumber,
      location,
      role,
      serviceCategory,
      yearsOfExperience,
      availability,
      hourlyRate,
      certifications,
    } = req.body;

    if (![USERROLE.CUSTOMER, USERROLE.SERVICEPROVIDER].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await User.create({
      email,
      password,
      fullName,
      phoneNumber,
      role,
    });

    let profile;

    if (role === USERROLE.CUSTOMER) {
      profile = await Customer.create({
        user: user._id,
        location: location,
      });
    }

    if (role === USERROLE.SERVICEPROVIDER) {
      profile = await ServiceProvider.create({
        user: user._id,
        serviceCategory,
        location,
        yearsOfExperience,
        availability,
        hourlyRate,
        certifications,
      });
    }

    user.profile = profile._id;
    user.verificationToken = user.generateVerificationToken();
    await user.save();
    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found with given credentials" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const payload = {
      role: user.role,
      id: user._id,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.status(200).json({
      id: user._id,
      username: user.fullName,
      email: user.email,
      role: user.role,
      profileImage: formatImageRepresentation(req, user.profileImage),
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Delete  profile
    if (user.role === USERROLE.CUSTOMER) {
      await Customer.deleteOne({ user: user._id });
    } else if (user.role === USERROLE.SERVICEPROVIDER) {
      await ServiceProvider.deleteOne({ user: user._id });
    }

    await user.deleteOne();
    res.status(200).json({
      message: "Your have successfully deleted your account and profile",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getUseProfile = async (req, res) => {
  const { id: userId } = req.user;

  try {
    const profile = await User.findById(userId)
      .populate({
        path: "profile",
        select: "-user",
      })
      .select("-password");

    if (!profile) {
      return res.status(404).json({ message: "User not found" });
    }

    profile.profileImage = formatImageRepresentation(req, profile.profileImage);
    res
      .status(200)
      .json({ profile, message: "User profile retrieved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.resetPasswordToken = user.generateResetPasswordToken();
    await user.save();

    res
      .status(200)
      .json({ message: "Password reset email sent", token: resetToken });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const requestEmailReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    user.verificationToken = user.generateVerificationToken;
    await user.save();

    res.status(200).json({ message: "Reeset email sent", token: resetToken });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const verifyAccessToken = (req, res) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Access token was not provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return res.status(200).json({ success: true });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ success: "Invalid token" });
    }
    return res.status(401).json({ message: "Token verification failed" });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    payload = {
      id: decoded.id,
      role: decoded.role,
    };
    return res.status(200).json({ accessToken: generateAccessToken(payload) });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Refresh token has expired" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    return res
      .status(401)
      .json({ message: "Refresh token verification failed" });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const updateProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profileImage = await uploadToCloudinaryOrToLocalServer(req);
    await user.save();

    return res.status(200).json({ profileImage: user.profileImage });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
};

module.exports = {
  register,
  deleteUser,
  getUseProfile,
  login,
  verifyEmail,
  requestPasswordReset,
  requestEmailReset,
  verifyAccessToken,
  refreshAccessToken,
  getSidebarUsers,
  updateProfileImage,
};
