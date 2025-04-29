const { model, Schema } = require("mongoose");

const reviewSchema = Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    serviceProvider: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: { type: Number, min: 1, max: 5, required: true },

    comment: { type: String, trim: true },
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = model("Review", reviewSchema);
