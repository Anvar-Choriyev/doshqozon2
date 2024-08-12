const { Op } = require("sequelize");
const Order = require("../order/Order");
const OrderItems = require("../orderItem/OrderItem");
const catchAsync = require("../../core/utils/catchAsync");
const statusOrder = require("../../core/constants/orderStatus");
const typeOrder = require("../../core/constants/orderType");
const typePayment = require("../../core/constants/paymentType");
const Food = require("../food/Food");
const Attachments = require("../attachments/Attachments");
const TimeObejct = require("../../core/utils/TimeObject");
const User = require("../user/User");
const QueryBuilder = require("../../core/utils/QueryBuilder");
const FoodItem = require("../foodItem/FoodItem");

exports.getAllOrders = catchAsync(
  async (req, res, next) => {
    const { id, userRole } = req.user;
    const queryData = req.query;
    const query = Object.keys(req.query)[0];
    const getTime = new TimeObejct(
      query,
      queryData
    ).getTimes();
    let whereObj = {
      where: {
        createdAt: {
          [Op.gt]: getTime.start,
          [Op.lt]: getTime.end,
        },
      },
    };
    if (userRole === "CASHIER") {
      whereObj.where = { stuffId: id, ...whereObj.where };
    }
    const allOrders = await Order.findAndCountAll({
      order: [["createdAt", "DESC"]],
      ...whereObj,
      include: [
        {
          model: User,
          as: "stuff",
          attributes: ["firstName"],
          include: [
            {
              model: Attachments,
              as: "attachment",
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    res.json({
      status: "succes",
      message: "Barcha buyurtmalar",
      errors: null,
      data: allOrders.rows,
    });
  }
);

exports.createOrder = catchAsync(async (req, res, next) => {
  const { id, userRole } = req.user;
  const items = req.body.items;
  const orderType = req.body.orderType;
  const paymentType = req.body.paymentType;
  let newOrder;
  if (items?.length > 0) {
    newOrder = await Order.create({
      stuffId: id,
      orderType,
      paymentType,
    });
  }
  const itemArr = [];

  items?.forEach(item => {
    return itemArr.push({
      itemTotalPrice: item.price * item.count,
      quantity: item.count,
      foodItemId: item.id,
      orderId: newOrder.id,
    });
  });
  await OrderItems.bulkCreate(itemArr);
  const totalMone = await OrderItems.sum("itemTotalPrice", {
    where: { orderId: { [Op.eq]: newOrder.id } },
  });

  await newOrder.update({ totalPrice: totalMone });
  if (orderType === typeOrder.DINE_IN) {
    res.json({
      status: "succes",
      message: "Yangi buyurtma qo`shildi",
      errors: null,
      data: null,
    });
  } else {
    res.json({
      status: "succes",
      message: "Yangi buyurtma qo`shildi",
      errors: null,
      data: null,
    });
  }
});

exports.orderCompletion = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    await Order.update(
      {
        orderStatus: statusOrder.IN_PROCESS,
      },
      { where: { id: { [Op.eq]: id } } }
    );
    res.json({
      status: "succes",
      message: "Buyurtma qabul qilindi",
      errors: null,
      data: null,
    });
  }
);

exports.getOrderItemsbyOrder = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const allItemsbyOrder =
      await OrderItems.findAndCountAll({
        include: [
          {
            model: FoodItem,
            as: "foodItem",
            include: [
              { model: Attachments, as: "attachment" },
            ],
          },
        ],
        where: { orderId: { [Op.eq]: id } },
      });

    const sumOrder = await Order.sum("totalPrice", {
      where: { id: { [Op.eq]: id } },
    });

    res.json({
      status: "succes",
      message: "Buyurtmaga tegishli ovqatlar ro`yhati",
      errrors: null,
      data: { sum: sumOrder, items: allItemsbyOrder.rows },
    });
  }
);
