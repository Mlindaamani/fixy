const Conversation = require("../../models/ci/Conversation");

// Create a new conversation
const createConversation = async (req, res) => {
  const { providerId, customerId } = req.body;

  try {
    const conversation = await Conversation.create({ providerId, customerId });
    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all conversations for a user
const getUserConversations = async (req, res) => {
  const userId = req.user._id;

  try {
    const conversations = await Conversation.find({
      $or: [{ providerId: userId }, { customerId: userId }],
    }).populate("providerId customerId", "username email");

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update last message info in conversation
const updateLastMessage = async (conversationId, lastMessageContent) => {
  try {
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessageContent,
      lastMessageAt: Date.now(),
    });
  } catch (error) {
    console.error("Error updating last message:", error);
  }
};

module.exports = {
  createConversation,
  getUserConversations,
  updateLastMessage,
};
