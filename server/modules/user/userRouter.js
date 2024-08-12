const express = require("express");
const router = express.Router();
const userController = require("./userController");
const { createValidator, updateValidator, passwordChangeValidator } = require("./userValidator");

module.exports = router
  .get("/", userController.getAllUsers)
  .post("/", createValidator, userController.createUser)
  .get("/:id", userController.getUserById)
  .delete("/:id", userController.deleteUser)
  .put("/:id", updateValidator, userController.updateUser)
  .put("/:id/password", passwordChangeValidator, userController.updatePassword);
