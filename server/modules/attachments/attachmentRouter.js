const express = require("express")
const upload = require("../../core/middlewares/uploadMiddleware")
const attachmentController = require("../attachments/attachmentController")

const router = express.Router()

router
    .post("/", upload.single("food"), attachmentController.createImg)
    .get("/", attachmentController.getAllAttachments)
    .get("/:id", attachmentController.getAttachmentById)
    .put("/:id", attachmentController.activateImage)

module.exports = router