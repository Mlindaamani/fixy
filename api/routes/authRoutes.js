const express = require("express");
const {
  userIsAuthenticatedMiddleware,
} = require("../middlewares/authMiddleware");

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
} = require("../controllers/AuthController");

const AuthRouter = express.Router();
AuthRouter.get("/chat-users", userIsAuthenticatedMiddleware, getSidebarUsers);
AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.delete("/delete/:id", deleteUser);
AuthRouter.get("/verify-token", verifyAccessToken);
AuthRouter.post("/refresh-token", refreshAccessToken);
AuthRouter.get("/me", userIsAuthenticatedMiddleware, getUseProfile);
AuthRouter.post("/password-reset", requestPasswordReset);
AuthRouter.post("/email-reset", requestEmailReset);
AuthRouter.post("/verify-email", verifyEmail);

module.exports = { AuthRouter };
