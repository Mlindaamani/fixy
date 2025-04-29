const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");
const ServiceProvider = require("../models/ServiceProvider");
const {
  generateAccessToken,
  generateRefreshToken,
  generateVerificationToken,
  getVerificationTokenExpiration,
  generatePasswordResetToken,
  getPasswordTokenExpiration,
} = require("../utils/functions");

const register = async (req, res) => {
  let profile;
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

    if (!["customer", "serviceProvider"].includes(role)) {
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

    // Generate verification token
    user.verificationToken = generateVerificationToken();
    user.verificationTokenExpires = getVerificationTokenExpiration();
    await user.save();

    //
    if (role === "customer") {
      profile = await Customer.create({
        user: user._id,
        location: location,
      });
    } else if (role === "serviceProvider") {
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
    await user.save();
    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

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
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete corresponding profile
    if (user.role === "customer") {
      await Customer.deleteOne({ user: user._id });
    } else if (user.role === "serviceProvider") {
      await ServiceProvider.deleteOne({ user: user._id });
    }

    // Delete user
    await user.deleteOne();
    res.status(200).json({ message: "Account deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: "profile",
        select: "-user",
      })
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    user.resetPasswordToken = generatePasswordResetToken();
    user.resetPasswordExpires = getPasswordTokenExpiration();
    //Save the user to the dataase
    await user.save();

    res
      .status(200)
      .json({ message: "Password reset email sent", token: resetToken });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const requestEmailReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = generateVerificationToken();
    user.verificationToken = resetToken;
    user.verificationTokenExpires = getVerificationTokenExpiration();
    await user.save();

    res.status(200).json({ message: "Reeset email sent", token: resetToken });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

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
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

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

module.exports = {
  register,
  deleteUser,
  myProfile,
  login,
  verifyEmail,
  requestPasswordReset,
  requestEmailReset,
  verifyAccessToken,
  refreshAccessToken,
};
