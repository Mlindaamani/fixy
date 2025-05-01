const {
  sendMessage,
  markMessageAsRead,
  getMessagesBetweenUsers,
  deleteConversation,
} = require("../controllers/messageController");

const {
  userIsAuthenticatedMiddleware,
} = require("../middlewares/authMiddleware");

const express = require("express");
const messageRouter = express.Router();

messageRouter.post(
  "/send/:receiverId",
  userIsAuthenticatedMiddleware,
  sendMessage
);

messageRouter.get(
  "/chats/:receiverId",
  userIsAuthenticatedMiddleware,
  getMessagesBetweenUsers
);

messageRouter.delete("/delete/:conversationId", deleteConversation);

messageRouter.patch("/mark-as-read/:id", markMessageAsRead);

module.exports = { messageRouter };
