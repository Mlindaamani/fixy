const { model, Schema } = require("mongoose");

const conversationSchema = Schema(
  {
    providerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Service provider is required"],
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Customer is required"],
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
      description: "Timestamp of the last message for sorting on dashboard",
    },
    lastMessageContent: {
      type: String,
      description: "Preview of the last message for dashboard display",
    },
    isActive: {
      type: Boolean,
      default: true,
      description: "Indicates if the conversation is active",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

conversationSchema.index({ providerId: 1, customerId: 1 }, { unique: true });
conversationSchema.index({ providerId: 1, lastMessageAt: -1 });
conversationSchema.index({ customerId: 1, lastMessageAt: -1 });
module.exports = model("Conversation", conversationSchema);

// Create a new conversation
exports.createConversation = async (req, res) => {
  const { providerId, customerId } = req.body;

  try {
    const conversation = await Conversation.create({ providerId, customerId });
    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all conversations for a user
exports.getUserConversations = async (req, res) => {
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
exports.updateLastMessage = async (conversationId, lastMessageContent) => {
  try {
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessageContent,
      lastMessageAt: Date.now(),
    });
  } catch (error) {
    console.error("Error updating last message:", error);
  }
};
