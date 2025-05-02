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

const authRouter = express.Router();
authRouter.get("/chat-users", userIsAuthenticatedMiddleware, getSidebarUsers);
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.delete("/delete/:id", deleteUser);
authRouter.get("/verify-token", verifyAccessToken);
authRouter.post("/refresh-token", refreshAccessToken);
authRouter.get("/me", userIsAuthenticatedMiddleware, getUseProfile);
authRouter.post("/password-reset", requestPasswordReset);
authRouter.post("/email-reset", requestEmailReset);
authRouter.post("/verify-email", verifyEmail);

module.exports = { authRouter };
