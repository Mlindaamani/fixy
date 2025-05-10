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
  { timestamps: true }
);

// one review per user per service
reviewSchema.index({ service: 1, user: 1 }, { unique: true });

const updateServiceRating = async (serviceId) => {
  const Service = require("./Service");
  const reviews = await model("Review").find({ service: serviceId });
  const avgRating = reviews.length
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;
  const service = await Service.findById(serviceId);
  service.rating = Number(avgRating.toFixed(2));
  service.reviews = reviews.length;
  await service.save();
};

reviewSchema.post("save", async function (review) {
  await updateServiceRating(review.service);
});

reviewSchema.post("findOneAndUpdate", async function (review) {
  await updateServiceRating(review.service);
});

reviewSchema.post("findOneAndDelete", async function (review) {
  await updateServiceRating(review.service);
});

/** @type {import('mongoose').Model} */
module.exports = model("Review", reviewSchema);
