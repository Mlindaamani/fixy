const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const { io, getReceiverSocketId } = require("../socket");

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const sendMessage = async (req, res) => {
  const { conversationId, message } = req.body;
  const senderId = req.user.id;

  try {
    // Verify conversation exists
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // This ensures the user is part of the conversation
    if (
      conversation.provider.toString() !== senderId &&
      conversation.customer.toString() !== senderId
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Create new message
    const newMessage = await Message.create({
      conversationId,
      senderId,
      message,
      isRead: false,
    });

    // Update conversation's last message
    conversation.lastMessageAt = new Date();
    conversation.lastMessageContent = message;
    await conversation.save();

    // Determine receiver ID
    const receiverId =
      conversation.provider.toString() === senderId
        ? conversation.customer.toString()
        : conversation.provider.toString();

    const receiverSocketId = getReceiverSocketId(receiverId);

    // Emit only to receiver
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("new-message", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
// Get messages for a specific conversation
const getMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await Message.find({ conversationId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const markMessageAsRead = async (req, res) => {
  const { messageId } = req.params;

  try {
    await Message.findByIdAndUpdate(messageId, { isRead: true });
    res.status(200).json({ message: "Message marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  markMessageAsRead,
};
