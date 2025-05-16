const { Schema, model } = require("mongoose");

const serviceProviderSchema = Schema(
  {
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review", default: [] }],

    portfolio: [{ type: Schema.Types.ObjectId, ref: "Portfolio", default: [] }],

    title: { type: String, default: "Your title " },

    specialties: [{ type: String, default: [] }],

    totalJobCompleted: { type: Number, default: 0 },

    rating: { type: Number, default: 0 },

    bio: { type: String, default: "Here is my bio." },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    serviceCategory: {
      type: String,
      required: [true, "Service category is required"],
      trim: true,
    },

    yearsOfExperience: {
      type: Number,
      min: [0, "Years of experience cannot be negative"],
    },

    location: {
      type: String,
      trim: true,
    },

    availability: {
      type: String,
      trim: true,
    },

    hourlyRate: {
      type: Number,
      min: [0, "Hourly rate cannot be negative"],
    },

    certifications: [
      {
        name: { type: String, trim: true },
        issuer: { type: String, trim: true },
        dateIssued: { type: Date },
      },
    ],

    profile_status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

/** @type {import('mongoose').Model} */
module.exports = model("ServiceProvider", serviceProviderSchema);
