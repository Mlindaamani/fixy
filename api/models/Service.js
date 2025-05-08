const { Schema, model } = require("mongoose");

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    duration: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "plumbing",
        "electrical",
        "hvac",
        "carpentry",
        "cleaning",
        "gardening",
        "pest control",
        "painting",
        "roofing",
        "masonry",
        "welding",
        "landscaping",
        "flooring",
        "remodeling",
        "construction",
        "handyman",
        "appliance repair",
        "moving",
        "security",
        "locksmith",
        "car wash",
        "car detailing",
        "carpentry",
        "home improvement",
        "home repair",
        "home cleaning",
        "home maintenance",
        "home organization",
        "other",
      ],
    },

    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviews: {
      type: Number,
      default: 0,
    },

    coverage: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "pending",
    },
  },

  {
    timestamps: true,
  }
);

serviceSchema.index({ name: "text", description: "text" });

/** @type {import("mongoose").Model} */
module.exports = model("Service", serviceSchema);
