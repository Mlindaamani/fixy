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
    timestamps: true,
  }
);

messageSchema.index({ conversationId: 1, created_at: -1 });
messageSchema.index({ senderId: 1 });
module.exports = model("Message", messageSchema);

