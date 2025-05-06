const express = require("express");

const {
  userIsAuthenticatedMiddleware,
} = require("../middlewares/authMiddleware");
const {
  sendMessage,
  getMessages,
  markMessageAsRead,
} = require("../controllers/messageController");

const MessageRouter = express.Router();

MessageRouter.post("/send", userIsAuthenticatedMiddleware, sendMessage);
MessageRouter.get("/:conversationId", getMessages);
MessageRouter.patch("/read/:messageId", markMessageAsRead);

module.exports = { MessageRouter };
