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

module.exports = model("Portfolio", portfolioSchema);
