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
} = require("../controllers/AuthController");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/verify-token", verifyAccessToken);
authRouter.post("/refresh-token", refreshAccessToken);
authRouter.get("/me", userIsAuthenticatedMiddleware, myProfile);
authRouter.post("/password-reset", requestPasswordReset);
authRouter.post("/email-reset", requestEmailReset);
authRouter.post("/verify-email", verifyEmail);

module.exports = { authRouter };
