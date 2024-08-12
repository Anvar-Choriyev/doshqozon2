const express = require("express");
const foodController = require("./foodControllers");
const router = express.Router();
module.exports = router
  .get("/", foodController.getAllFoods)
  .get("/report", foodController.foodReport)
  .get("/:id", foodController.getFoodItemsByFood)
  .post("/", foodController.createFoods)
  .put("/:id", foodController.updateFoods)
  .put("/:id/status", foodController.updateStatus)
  .delete("/:id", foodController.deleteFoods);
