const express = require("express");
const reportControllers = require("./reportControllers");
const foodController = require("../food/foodControllers");
const router = express.Router();
module.exports = router
  .get(
    "/circle",
    reportControllers.circleGrossProfitByCategory
  )
  .get(
    "/dashboard",
    reportControllers.dashboardMiddleware,
    foodController.foodReport,
    reportControllers.reportByCashier,
    reportControllers.circleGrossProfitByCategory
  ).get("/rbyCash", reportControllers.reportByCashier);
