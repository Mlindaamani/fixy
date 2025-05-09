const Service = require("../Service");
const Review = require("../Review");

const updateServiceRating = async (serviceId) => {
  const reviews = await Review.find({ service: serviceId });
  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;
  const service = await Service.findById(serviceId);
  service.rating = Number(avgRating.toFixed(2));
  service.reviews = reviews.length;
  await service.save();
};

module.exports = (schema) => {
  schema.post("save", async function (doc) {
    await updateServiceRating(doc.service);
  });

  schema.post("findOneAndUpdate", async function (doc) {
    await updateServiceRating(doc.service);
  });

  schema.post("findOneAndDelete", async function (doc) {
    await updateServiceRating(doc.service);
  });
};
