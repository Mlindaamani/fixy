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
    },

    lastMessageContent: {
      type: String,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

conversationSchema.index({ providerId: 1, customerId: 1 }, { unique: true });
conversationSchema.index({ providerId: 1, lastMessageAt: -1 });
conversationSchema.index({ customerId: 1, lastMessageAt: -1 });

/** @type {import('mongoose').Model} */
module.exports = model("Conversation", conversationSchema);
