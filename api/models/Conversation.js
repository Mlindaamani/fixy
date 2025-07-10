const { model, Schema } = require("mongoose");

const conversationSchema = Schema(
  {
    provider: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Service provider is required"],
    },

    customer: {
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

conversationSchema.index({ provider: 1, customer: 1 }, { unique: true });
conversationSchema.index({ provider: 1, lastMessageAt: -1 });
conversationSchema.index({ customer: 1, lastMessageAt: -1 });

/** @type {import('mongoose').Model} */
module.exports = model("Conversation", conversationSchema);
