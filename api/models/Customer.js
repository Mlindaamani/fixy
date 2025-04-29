const { Schema, model } = require("mongoose");

const customerSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    location: { type: String, trim: true },

    preferences: { type: [String], default: [] },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = model("Customer", customerSchema);
