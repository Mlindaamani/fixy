const express = require("express");
const ciConversationRouter = express.Router();

const {
  createConversation,
  updateLastMessage,
  getUserConversations,
} = require("../../controllers/ci/ConversationController");

ciConversationRouter.post("/create", createConversation);
ciConversationRouter.get("/", getUserConversations);
ciConversationRouter.patch("/updateLastMessage", updateLastMessage);

module.exports = ciConversationRouter;
