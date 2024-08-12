const Category = require("./Category");
const catchAsync = require("../../core/utils/catchAsync");
const Attachments = require("../attachments/Attachments");
const Food = require("../food/Food");
const { Op } = require("sequelize");
const fs = require("fs");
const QueryBuilder = require("../../core/utils/QueryBuilder");
exports.getAllCategories = catchAsync(
  async (req, res, next) => {
    const queryBuilder = new QueryBuilder(req.query);
    queryBuilder.search(["name"]);
    const allCategories = await Category.findAndCountAll({
      ...queryBuilder.queryOptions,
      include: { model: Attachments, as: "attachment" },
    });

    res.json({
      status: "succes",
      message: "Barcha kategoriyalar",
      error: null,
      data: allCategories.rows,
    });
  }
);
exports.getAllFoodsbyCategory = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const queryBuilder = new QueryBuilder(req.query);
    const findByCategory = await Category.findByPk(id, {
      attributes: ["name", "color"],
      include: { model: Attachments, as: "attachment" },
    });

    const allFoodsbyCategory = await Food.findAll({
      where: {
        categoryId: { [Op.eq]: id },
      },
      ...queryBuilder.queryOptions,
      include: { model: Attachments, as: "attachment" },
    });
    res.json({
      status: "succes",
      message: "Kategoriyaga tegishli taomlar",
      error: null,
      data: {
        category: findByCategory,
        foodsArr: allFoodsbyCategory,
      },
    });
  }
);

exports.createCategory = catchAsync(
  async (req, res, next) => {
    await Category.bulkCreate(req.body.categories);

    res.json({
      status: "success",
      message: "Yangi kategoriya qo'shildi",
      error: null,
      data: null,
    });
  }
);

exports.updateCategory = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const categoryById = await Category.findByPk(id, {
      include: { model: Attachments, as: "attachment" },
    });
    let updatedCategory;
    updatedCategory = await categoryById.update(req.body);
    res.json({
      status: "success",
      message: "Taom ma'lumotlari o'zgartirildi",
      error: null,
      data: updatedCategory,
    });
  }
);

exports.deleteCategory = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const categoryById = await Category.findByPk(id);
    const attachmentByCategory = await Attachments.findOne({
      where: {
        id: { [Op.eq]: categoryById.attachmentId },
      },
    });
    await attachmentByCategory?.destroy();
    const foodByCategory = await Food.findAll({
      where: {
        categoryId: { [Op.eq]: id },
      },
    });

    foodByCategory.forEach(async food => {
      const foodAttachment = await Attachments.findOne({
        where: {
          id: { [Op.eq]: food.attachmentId },
        },
      });
      await foodAttachment.destroy();
      await food.destroy();
      const directoryPath = `./build/img/${foodAttachment.name}`;
      fs.unlink(directoryPath, err => {
        if (err) {
          throw err;
        }
        console.log("Delete file successfully.");
      });
    });
    await categoryById.destroy();
    const directoryPath = `./build/img/${attachmentByCategory.name}`;
    fs.unlink(directoryPath, err => {
      if (err) {
        throw err;
      }
      console.log("Delete file successfully.");
    });
    res.json({
      status: "success",
      message: "Kategoriya o'chirildi",
      error: null,
      data: null,
    });
  }
);
