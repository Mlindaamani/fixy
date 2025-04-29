const { model, Schema } = require("mongoose");

const messageSchema = Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Sender is required"],
    },

    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "The sender id is required"],
    },

    message: {
      type: String,
      required: [true, "Message is required"],
      min: [1, "Message is too short"],
      max: [1000, "Message is too long"],
      required: true,
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

module.exports = model("Message", messageSchema);
