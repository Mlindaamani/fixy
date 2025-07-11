const express = require("express");
const {
  createBooking,
  getBookings,
} = require("../controllers/BookingController");
const {
  userIsAuthenticatedMiddleware,
} = require("../middlewares/AuthMiddleware");

const BookingRouter = express.Router();

BookingRouter.post("/", userIsAuthenticatedMiddleware, createBooking);
BookingRouter.get("/", userIsAuthenticatedMiddleware, getBookings);

module.exports = { BookingRouter };
