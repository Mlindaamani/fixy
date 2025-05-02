const { model, Schema } = require("mongoose");

const messageSchema = Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: [true, "Conversation is required"],
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Sender is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      min: [1, "Message is too short"],
      max: [1000, "Message is too long"],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

messageSchema.index({ conversationId: 1, created_at: -1 });
messageSchema.index({ senderId: 1 });
module.exports = model("Message", messageSchema);

// Create a new message
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

// Send a new message
exports.sendMessage = async (req, res) => {
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
exports.getMessages = async (req, res) => {
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
exports.markMessageAsRead = async (req, res) => {
  const { messageId } = req.params;

  try {
    await Message.findByIdAndUpdate(messageId, { isRead: true });
    res.status(200).json({ message: "Message marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
