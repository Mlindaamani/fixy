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
    timestamps: true,
  }
);

conversationSchema.index({ providerId: 1, customerId: 1 }, { unique: true });
conversationSchema.index({ providerId: 1, lastMessageAt: -1 });
conversationSchema.index({ customerId: 1, lastMessageAt: -1 });

module.exports = model("Conversation", conversationSchema);