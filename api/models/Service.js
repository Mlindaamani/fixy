const { Schema, model } = require("mongoose");

const serviceSchema = Schema(
  {
    name: { type: String, required: true, unique: true },

    description: { type: String, required: true },

    price: { type: Number, required: true },

    duration: { type: Number, required: true },

    category: {
      type: Schema.Types.ObjectId,
      ref: "ServiceCategory",
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = model("Service", serviceSchema);
