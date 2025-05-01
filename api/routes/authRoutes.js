const express = require("express");
const {
  userIsAuthenticatedMiddleware,
} = require("../middlewares/authMiddleware");

const {
  register,
  login,
  verifyAccessToken,
  myProfile,
  refreshAccessToken,
  requestPasswordReset,
  verifyEmail,
  requestEmailReset,
  deleteUser,
  getSidebarUsers
} = require("../controllers/AuthController");

const authRouter = express.Router();
authRouter.get("/chat-users", userIsAuthenticatedMiddleware, getSidebarUsers);
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.delete("/delete/:id", deleteUser);
authRouter.get("/verify-token", verifyAccessToken);
authRouter.post("/refresh-token", refreshAccessToken);
authRouter.get("/me", userIsAuthenticatedMiddleware, myProfile);
authRouter.post("/password-reset", requestPasswordReset);
authRouter.post("/email-reset", requestEmailReset);
authRouter.post("/verify-email", verifyEmail);

module.exports = { authRouter };
