const { Schema, model } = require("mongoose");

const bookingSchema = Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Customer is required"],
    },

    provider: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Service provider is required"],
    },

    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "Service is required"],
    },

    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

bookingSchema.index({ customer: 1, provider: 1, service: 1 }, { unique: true });

/** @type {import('mongoose').Model} */
module.exports = model("Booking", bookingSchema);
