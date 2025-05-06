const express = require("express");
const {
  userIsAuthenticatedMiddleware,
} = require("../../middlewares/authMiddleware");
const ciConversationRouter = express.Router();
const {
  createConversation,
  getUserConversations,
} = require("../../controllers/ci/ConversationController");

ciConversationRouter.get(
  "/",
  userIsAuthenticatedMiddleware,
  getUserConversations
);

ciConversationRouter.post(
  "/create",
  userIsAuthenticatedMiddleware,
  createConversation
);

module.exports = { ciConversationRouter };
