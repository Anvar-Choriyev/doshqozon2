const { Op } = require("sequelize");
const Food = require("./Food");
const FoodItem = require("../foodItem/FoodItem");
const catchAsync = require("../../core/utils/catchAsync");
const Attachments = require("../attachments/Attachments");
const fs = require("fs");
const QueryBuilder = require("../../core/utils/QueryBuilder");
const OrderItem = require("../orderItem/OrderItem");
const TimeObject = require("../../core/utils/TimeObject");
const Order = require("../order/Order");
const AppError = require("../../core/utils/AppError");

exports.getAllFoods = catchAsync(async (req, res, next) => {
  const queryBuilder = new QueryBuilder(req.query);
  queryBuilder.filter();
  const allFoods = await Food.findAll({
    ...queryBuilder.queryOptions,
    include: [{ model: Attachments, as: "attachment" }],
  });
  res.json({
    status: "success",
    message: "Barcha taomlar",
    error: null,
    data: allFoods,
  });
});

exports.getFoodItemsByFood = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const findByFood = await Food.findByPk(id, {
      include: [{ model: Attachments, as: "attachment" }],
    });
    const foodItemsByFood = await FoodItem.findAll({
      where: { foodId: { [Op.eq]: findByFood.id } },
      order: [["createdAt", "desc"]],
      include: [{ model: Attachments, as: "attachment" }],
    });

    res.json({
      status: "success",
      message: "Tanlangan taom qo'shimchasi",
      error: null,
      data: {
        mainFood: findByFood,
        foodItemsByFood,
      },
    });
  }
);

exports.createFoods = catchAsync(async (req, res, next) => {
  const { foods } = req.body;
  const newFoods = await Food.bulkCreate(foods);
  res.status(201).json({
    status: "success",
    message: "Taom yaratildi",
    error: null,
    data: newFoods,
  });
});

exports.updateFoods = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const foodById = await Food.findByPk(id, {
    include: { model: Attachments, as: "attachment" },
  });
  let updatedFood;
  updatedFood = await foodById.update(req.body);
  res.json({
    status: "success",
    message: "Taom ma'lumotlari o'zgartirildi",
    error: null,
    data: updatedFood,
  });
});

exports.deleteFoods = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const foodById = await Food.findByPk(id);
  const attachmentByFood = await Attachments.findOne({
    where: {
      id: { [Op.eq]: foodById.attachmentId },
    },
  });
  const foodItemByFood = await FoodItem.findAll({
    where: {
      foodId: { [Op.eq]: id },
    },
  });
  foodItemByFood.forEach(async foodItem => {
    const foodItemAttachment = await Attachments.findOne({
      where: {
        id: { [Op.eq]: foodItem.attachmentId },
      },
    });
    await foodItemAttachment.destroy();
    await foodItem.destroy();
    const directoryPath = `./build/img/${foodItemAttachment.name}`;
    fs.unlink(directoryPath, err => {
      if (err) {
        throw err;
      }
    });
  });
  await attachmentByFood?.destroy();
  await foodById.destroy();
  const directoryPath = `./build/img/${attachmentByFood.name}`;
  fs.unlink(directoryPath, err => {
    if (err) {
      throw err;
    }
  });
  res.json({
    status: "success",
    message: "Taom o'chirildi",
    error: null,
    data: null,
  });
});

exports.foodReport = catchAsync(async (req, res, next) => {
  const { id, userRole } = req.user;
  const queryData = req.query;
  const query = Object.keys(req.query).find(
    e =>
      e === "yesterday" ||
      "today" ||
      "week" ||
      "month" ||
      "year" ||
      "all" ||
      ("start" && "end")
  );
  const getTime = new TimeObject(
    query,
    queryData
  ).getTimes();

  let orderObj = {};
  if (userRole === "CASHIER") {
    orderObj = {
      model: Order,
      as: "order",
      where: { stuffId: +id },
    };
  } else {
    orderObj = { model: Order, as: "order" };
  }
  
  let getAllOrderItem = await OrderItem.findAll({
    where: {
      createdAt: {
        [Op.gt]: getTime.start,
        [Op.lt]: getTime.end,
      },
    },
    include: [
      {
        model: FoodItem,
        as: "foodItem",
        attributes: ["name"],
        include: [
          {
            model: Attachments,
            as: "attachment",
            attributes: ["name"],
          },
        ],
      },
      orderObj,
    ],
    attributes: ["id", "itemTotalPrice", "createdAt", "foodItemId"],
  });
  let foodStaticObject = []
  let foodsId = [...new Set(getAllOrderItem.map(e=> e.foodItemId))]
  
  let foods = await FoodItem.findAll({where: {id: foodsId}, include: [
    {
      model: Attachments,
      as: "attachment",
    },
  ] } )

  foods.map(async e=>{
    let sum = 0
    let count = 0
    const foodItemObject = await OrderItem.findAll({
      where: { foodItemId: e.id,

        createdAt: {
          [Op.gt]: getTime.start,
          [Op.lt]: getTime.end,
        },
      },
      include: [
        {
          model: FoodItem,
          as: "foodItem",
        },
        orderObj,
      ],
    });
    foodItemObject.forEach(e=> {return sum += e.itemTotalPrice, count +=e.quantity})
    foodStaticObject.push({id: e.id, count, itemTotalPrice: sum, foodItem:{name: e.name, attachment: {name: e.attachment?.name}}})
  })
  getAllOrderItem = foodStaticObject
  const queryAll = Object.keys(req.query).find(
    e => e === "all"
  );
  if (queryAll) {
    req.foodReport = getAllOrderItem;
    next();
  } else {
    setTimeout(()=>{
      res.json(
        {
        status: "success",
        message: "taomlar statistikasi",
        error: null,
        data: getAllOrderItem,
      })
    }, 500)
   
  }
});

exports.updateStatus = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    const foodById = await Food.findByPk(id);
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
