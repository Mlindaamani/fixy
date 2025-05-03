const Message = require("../../models/ci/Message");
const Conversation = require("../../models/ci/Conversation");

// Send a new message
const sendMessage = async (req, res) => {
  const { conversationId, senderId, message } = req.body;

  try {
    const newMessage = await Message.create({
      conversationId,
      senderId,
      message,
    });

    // Update the last message in the conversation
    await Conversation.updateLastMessage(conversationId, message);

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get messages for a specific conversation
const getMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await Message.find({ conversationId }).populate(
      "senderId",
      "username email"
    );
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark message as read
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
