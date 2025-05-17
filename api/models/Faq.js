const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const FaqSchema = Schema({
  question: {
    type: String,
    trim: true,
    maxlength: 1000,
    required: true,
  },

  answer: {
    type: String,
    trim: true,
    maxlength: 1000,
    required: true,
  },
});

/**
 * @param {import("mongoose").Model}
 */
module.exports = model("Faq", FaqSchema);
