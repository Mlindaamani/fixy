const { model, Schema } = require("mongoose");

const portfolioSchema = Schema(
  {
    file_url: { type: String },

    description: { type: String },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

/** @type {import('mongoose').Model} */
module.exports = model("Portfolio", portfolioSchema);
