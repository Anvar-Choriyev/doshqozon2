const Attachments = require("../attachments/Attachments")
const Foods = require("../food/Food")
const catchAsync = require("../../core/utils/catchAsync")
const sharp = require("sharp")
const fs = require("fs")
const Category = require("../category/Category")
const { Op } = require("sequelize")
const User = require("../user/User")

exports.createImg = catchAsync(async (req, res, next) => {
    await sharp(req.file.path).resize(160).toFile(`./build/img/${req.file.filename.slice(0, req.file.filename.lastIndexOf('.'))}.webp`)
      fs.unlink(req.file.path, (err) => {
        if(err) {
          throw err
        }
        console.log("Delete file successfully.");
      })
    const imgObj = {
        name: `${req.file.filename.slice(0, req.file.filename.lastIndexOf('.'))}.webp`,
        originalName: req.file.originalname,
        size: req.file.size,
        url: req.file.path,
        type: "webp"
    }
    const newAttachment = await Attachments.create(imgObj)
    res.status(201).json({
        status: "success",
        message: "",
        error: null,
        data: {
            newAttachment
        }
    })
})
exports.getAllAttachments = catchAsync(async (req, res, next) => {
    const allAttachments = await Attachments.findAll()
    
    allAttachments.forEach(async (attachments) => {
        if(attachments.isConnect === false ) {
            const directoryPath = `./build/img/${attachments.name}`;
            fs.unlink(directoryPath, err => {
                if (err) {
                    throw err;
                }
                console.log("Delete file successfully.");
            });
            await attachments.destroy()
        }
    })
    
    res.json({
        status: "success",
        message: "Barcha rasmlar",
        error: null,
        data: allAttachments
    })
})

exports.getAttachmentById = catchAsync(async (req, res, next) => {
    const {id} = req.params
    const attachmentById = await Attachments.findByPk(id) 
    res.json({
        status: "success",
        message: "Tanlangan rasm",
        error: null,
        data: attachmentById
    })
})

exports.activateImage  = catchAsync(async (req, res, next) => {
    const {id} = req.params
    const attachmentById = await Attachments.findByPk(id)
    await attachmentById.update({isConnect: true})
    res.json({
        status: "success",
        message: "Rasm aktivlashtirildi",
        error: null,
        data: attachmentById
    })
})