const express = require("express");
const {
  getCustomerById,
  updateCustomerProfile,
  getCustomers,
} = require("../controllers/customerController");

const CustomerRouter = express.Router();

CustomerRouter.get("/", getCustomers);
CustomerRouter.get("/:id", getCustomerById);
CustomerRouter.put("/profile-update/:id", updateCustomerProfile);
module.exports = { CustomerRouter };
