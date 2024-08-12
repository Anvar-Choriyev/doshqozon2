const catchAsync = require("../../core/utils/catchAsync");
const Attachments = require("../attachments/Attachments");
const { Op } = require("sequelize");
const fs = require("fs");
const FoodItem = require("./FoodItem");

exports.getFoodItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const foodItems = await FoodItem.findByPk(id, {
    include: { model: Attachments, as: "attachment" },
  });
  res.json({
    status: "success",
    message: "Tanlangan taom qo'shimchasi",
    error: null,
    data: {
      foodItems: [foodItems],
      main: {
        name: foodItems.name,
        img: foodItems.attachment.name,
        sum: foodItems.price,
      },
    },
  });
});

exports.createFoodItems = catchAsync(
  async (req, res, next) => {
    const { foodItems } = req.body;
    const newFoodItem = await FoodItem.bulkCreate(
      foodItems
    );
    res.status(201).json({
      status: "success",
      message: "Taom qo'shimchasi yaratildi",
      error: null,
      data: newFoodItem,
    });
  }
);

exports.updateFoodItems = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const foodItemById = await FoodItem.findByPk(id);
    let updatedFoodItem;
    updatedFoodItem = await foodItemById.update(req.body);
    res.json({
      status: "success",
      message: "Qo'shimcha taom ma'lumotlari o'zgartirildi",
      error: null,
      data: updatedFoodItem,
    });
  }
);

exports.deleteFoodItems = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const foodItemById = await FoodItem.findByPk(id);
    console.log(foodItemById);
    const attachmentByFoodItem = await Attachments.findOne({
      where: {
        id: { [Op.eq]: foodItemById.attachmentId },
      },
    });
    await attachmentByFoodItem.destroy();
    await foodItemById.destroy();
    const directoryPath = `./build/img/${attachmentByFoodItem.name}`;
    fs.unlink(directoryPath, err => {
      if (err) {
        throw err;
      }
      console.log("Delete file successfully.");
    });
    res.json({
      status: "success",
      message: "Qo'shimcha taom o'chirildi",
      error: null,
      data: null,
    });
  }
);

exports.updateStatus = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    const foodById = await FoodItem.findByPk(id);
    if (!foodById) {
      return next(new AppError("Bunday taom topilmadi"));
    }
    const updateFoodStatus = await foodById.update({
      status,
    });
    res.status(203).json({
      status: "success",
      message: "Taom holati o'zgardi",
      error: null,
      data: updateFoodStatus,
    });
  }
);
