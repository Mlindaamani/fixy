const express = require("express");
const {
  userIsAuthenticatedMiddleware,
} = require("../middlewares/AuthMiddleware");

const { uploadProfiles } = require("../middlewares/FileUploadMiddleware");

const {
  register,
  login,
  verifyAccessToken,
  refreshAccessToken,
  requestPasswordReset,
  verifyEmail,
  requestEmailReset,
  deleteUser,
  getSidebarUsers,
  getUseProfile,
  updateProfileImage,
} = require("../controllers/AuthController");

const AuthRouter = express.Router();
AuthRouter.get("/chat-users", userIsAuthenticatedMiddleware, getSidebarUsers);
AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.delete("/delete/:id", deleteUser);
AuthRouter.get("/verify-token", verifyAccessToken);
AuthRouter.post("/refresh-token", refreshAccessToken);
AuthRouter.post("/password-reset", requestPasswordReset);
AuthRouter.post("/email-reset", requestEmailReset);
AuthRouter.post("/verify-email", verifyEmail);
AuthRouter.get("/me/profile", userIsAuthenticatedMiddleware, getUseProfile);
AuthRouter.post(
  "/me/profile-image",
  userIsAuthenticatedMiddleware,
  uploadProfiles.single("profileImage"),
  updateProfileImage
);

module.exports = { AuthRouter };
