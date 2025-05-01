const express = require("express");
const {
  getCustomerById,
  updateCustomerProfile,
  getCustomers,
} = require("../controllers/customerController");

const customerRouter = express.Router();

customerRouter.get("/", getCustomers);
customerRouter.get("/:id", getCustomerById);
customerRouter.put("/profile-update/:id", updateCustomerProfile);
module.exports = { customerRouter };
