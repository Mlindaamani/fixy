const express = require("express");
const ciMessageRouter = express.Router();
const {
  sendMessage,
  getMessages,
  markMessageAsRead,
} = require("../../controllers/ci/MessageController");

ciMessageRouter.post("/send", sendMessage);
ciMessageRouter.get("/:conversationId", getMessages);
ciMessageRouter.patch("/read/:messageId", markMessageAsRead);
