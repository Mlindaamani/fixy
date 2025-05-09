const { model, Schema } = require("mongoose");

const reviewSchema = new Schema(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure one review per user per service
reviewSchema.index({ service: 1, user: 1 }, { unique: true });

// const reviewHooks = require("./hooks/reviewHooks");
// reviewSchema.plugin(reviewHooks);

// // Update service rating and reviews count after a review is saved
// reviewSchema.post("save", async function (doc) {
//   // Lazy require to avoid circular dependency
//   const Service = require("./Service");
//   const service = await Service.findById(doc.service);
//   const reviews = await this.model("Review").find({ service: doc.service });
//   const avgRating =
//     reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length || 0;
//   service.rating = Number(avgRating.toFixed(2));
//   service.reviews = reviews.length;
//   await service.save();
// });

// Function to update service rating and reviews
const updateServiceRating = async (serviceId) => {
  const Service = require("./Service");
  const reviews = await model("Review").find({ service: serviceId });
  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;
  const service = await Service.findById(serviceId);
  service.rating = Number(avgRating.toFixed(2));
  service.reviews = reviews.length;
  await service.save();
};

// Hooks for save, update, and delete
reviewSchema.post("save", async function (doc) {
  await updateServiceRating(doc.service);
});

reviewSchema.post("findOneAndUpdate", async function (doc) {
  await updateServiceRating(doc.service);
});

reviewSchema.post("findOneAndDelete", async function (doc) {
  await updateServiceRating(doc.service);
});

/** @type {import('mongoose').Model} */
module.exports = model("Review", reviewSchema);
