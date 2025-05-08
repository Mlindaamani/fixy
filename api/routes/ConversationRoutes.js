const express = require("express");
const {
  userIsAuthenticatedMiddleware,
} = require("../middlewares/AuthMiddleware");

const ConversationRouter = express.Router();

const {
  createConversation,
  getUserConversations,
} = require("../controllers/ConversationController");

ConversationRouter.get(
  "/",
  userIsAuthenticatedMiddleware,
  getUserConversations
);

ConversationRouter.post(
  "/create",
  userIsAuthenticatedMiddleware,
  createConversation
);

module.exports = { ConversationRouter };
