const express = require("express");
const roleMiddleware = require("../../core/middlewares/roleMiddleware");
const orderController = require("../order/orderController");
const router = express.Router();

module.exports = router
  .get(
    "/",
    roleMiddleware(["ADMIN", "STUFF", "CASHIER"]),
    orderController.getAllOrders
  )
  .post(
    "/",
    roleMiddleware(["ADMIN", "STUFF", "CASHIER"]),
    orderController.createOrder
  )
  .get(
    "/:id",
    roleMiddleware(["ADMIN", "STUFF", "CASHIER"]),
    orderController.getOrderItemsbyOrder
  )
  .patch(
    "/:id",
    roleMiddleware(["ADMIN", "STUFF"]),
    orderController.orderCompletion
  )
