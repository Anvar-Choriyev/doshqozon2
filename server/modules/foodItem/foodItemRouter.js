const express = require("express");
const foodItemController = require("./foodItemController");
const router = express.Router();

module.exports = router
  .get("/:id", foodItemController.getFoodItem)
  .post("/:id", foodItemController.createFoodItems)
  .put("/:id", foodItemController.updateFoodItems)
  .put("/:id/status", foodItemController.updateStatus)
  .delete("/:id", foodItemController.deleteFoodItems);
