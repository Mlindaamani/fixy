const express = require("express");
const ciMessageRouter = express.Router();
const {
  userIsAuthenticatedMiddleware,
} = require("../../middlewares/authMiddleware");
const {
  sendMessage,
  getMessages,
  markMessageAsRead,
} = require("../../controllers/ci/MessageController");

ciMessageRouter.post("/send", userIsAuthenticatedMiddleware, sendMessage);
ciMessageRouter.get("/:conversationId", getMessages);
ciMessageRouter.patch("/read/:messageId", markMessageAsRead);

module.exports = { ciMessageRouter };
