const Order = require("../order/Order");
const Food = require("../food/Food");
const OrderItems = require("../orderItem/OrderItem");
const catchAsync = require("../../core/utils/catchAsync");
const Category = require("../category/Category");
const { Op } = require("sequelize");
const Attachments = require("../attachments/Attachments");
const TimeObject = require("../../core/utils/TimeObject");
const AppError = require("../../core/utils/AppError");
const User = require("../user/User");
const FoodItem = require("../foodItem/FoodItem");

exports.circleGrossProfitByCategory = catchAsync(
  async (req, res, next) => {
    const { id, userRole } = req.user;
    const queryData = req.query;
    // return console.log(queryData);
    const query = Object.keys(req.query).find(
      e =>
        e === "yesterday" ||
        "today" ||
        "week" ||
        "month" ||
        "year" ||
        ("start" && "end")
    );
    const getTime = new TimeObject(
      query,
      queryData
    ).getTimes();
    const allCategory = await Category.findAll({
      include: [{ model: Attachments, as: "attachment" }],
      attributes: ["id", "name", "color"],
      where: {
        createdAt: {
          [Op.lt]: getTime.end,
        },
      },
    });
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
    let sum = [];
    allCategory?.map(async e => {
      const sumByCategory = await OrderItems.findAll({
        where: {
          createdAt: {
            [Op.gt]: getTime.start,
            [Op.lt]: getTime.end,
          },
        },
        attributes: ["itemTotalPrice"],
        include: [
          {
            model: FoodItem,
            as: "foodItem",
            include: [
              {
                model: Food,
                as: "food",
                where: { categoryId: { [Op.eq]: e.id } },
              },
            ],
          },
          orderObj,
        ],
      });
      const lastOrderItem = await OrderItems.findOne({
        where: {
          createdAt: {
            [Op.gt]: getTime.start,
            [Op.lt]: getTime.end,
          },
        },
        attributes: ["itemTotalPrice", "createdAt"],
        include: [
          {
            model: FoodItem,
            as: "foodItem",
            include: [
              {
                model: Food,
                as: "food",
                where: { categoryId: { [Op.eq]: e.id } },
              },
            ],
          },
          orderObj,
        ],
        order: [["createdAt", "DESC"]],
      });

      const sumItem = sumByCategory?.reduce(
        (acc, element) => acc + element.itemTotalPrice,
        0
      );
      if (sumItem > 0) {
        sum.push({
          id: e.id,
          img: e.attachment.name,
          name: e.name,
          color: e.color,
          sum: sumItem || 0,
          last: lastOrderItem?.itemTotalPrice || 0,
        });
      }
    });

    let allPayments = await Order.findAll({
      where: {
        createdAt: {
          [Op.gt]: getTime.start,
          [Op.lt]: getTime.end,
        },
        ...orderObj.where,
      },
      attribute: ["totalPrice"],
    });
    let allPaymentbyCard = await Order.findAll({
      where: {
        paymentType: "CARD",
        createdAt: {
          [Op.gt]: getTime.start,
          [Op.lt]: getTime.end,
        },
        ...orderObj.where,
      },
      attribute: ["totalPrice"],
    });

    let allPaymentByCash = await Order.findAll({
      where: {
        paymentType: "CASH",
        createdAt: {
          [Op.gt]: getTime.start,
          [Op.lt]: getTime.end,
        },
        ...orderObj.where,
      },
      attribute: ["totalPrice"],
    });
    let totalPrice = 0;
    let totalPriceCard = 0;
    let totalPriceCash = 0;
    allPayments?.map(e => (totalPrice += e.totalPrice));
    allPaymentbyCard?.map(
      e => (totalPriceCard += e.totalPrice)
    );
    allPaymentByCash?.map(
      e => (totalPriceCash += e.totalPrice)
    );
    allPayments = totalPrice;
    allPaymentbyCard = totalPriceCard;
    allPaymentByCash = totalPriceCash;

    const queryAll = Object.keys(req.query).find(
      e => e === "all"
    );

    if (queryAll) {
      setTimeout(() => {
        const dashboard = {
          foodReport: req.foodReport,
          cashier: req.cashier,
          sum: sum,
          allPayments: allPayments,
        };

        res.json({
          status: "success",
          message: "Asosiy menyu",
          data: dashboard,
        });
      }, 500);
    } else {
      setTimeout(
        () =>
          res.json({
            status: "success",
            message: "Kategoriya bo`yicha",
            data: {
              sum,
              allPayments,
              allPaymentbyCard,
              allPaymentByCash,
            },
          }),
        500
      );
    }
  }
);

exports.dashboardMiddleware = catchAsync(
  async (req, res, next) => {
    const queryObject = Object.keys(req.query);
    const queryArr = [
      "yesterday",
      "today",
      "week",
      "month",
      "year",
      "all",
    ];

    if (
      queryObject.length <= 2 &&
      queryObject[1] != "all"
    ) {
      return res.json({
        status: "fail",
        message: "Asosiy menyusi statistikasi topilmadi",
        errors: "Data not found",
        data: null,
      });
    } else {
      next();
    }
  }
);

exports.isCategory = catchAsync(async (req, res, next) => {
  const categories = await Category.count();

  if (!categories) {
    return res.json({
      status: "fail",
      message: "Ketegoriya mavjud emas",
      errors: null,
      data: null,
    });
  } else {
    next();
  }
});

exports.reportByCashier = catchAsync(
  async (req, res, next) => {
    const query = Object.keys(req.query).find(
      e =>
        e === "yesterday" ||
        "today" ||
        "week" ||
        "month" ||
        "year"
    );
    const queryData = req.query;
    const getTime = new TimeObject(
      query,
      queryData
    ).getTimes();

    const allCashier = await User.findAll({
      where: { userRole: "CASHIER" },
      include: [{ model: Attachments, as: "attachment" }],
    });
    let cashier = [];
    allCashier?.map(async e => {
      let totalSumOrdersbyCashier = await Order.sum(
        "totalPrice",
        {
          where: {
            stuffId: e.id,
            createdAt: {
              [Op.gt]: getTime.start,
              [Op.lt]: getTime.end,
            },
          },
        }
      );
      totalSumOrdersbyCashier === null
        ? (totalSumOrdersbyCashier = 0)
        : 0;

      if (totalSumOrdersbyCashier != 0) {
        cashier.push({
          id: e.id,
          name: `${e.firstName + " " + e.lastName}`,
          img: e.attachment?.name,
          sum: totalSumOrdersbyCashier || 0,
        });
      }
    });

    const queryAll = Object.keys(req.query).find(
      e => e === "all"
    );
    if (queryAll) {
      req.cashier = cashier;
      next();
    } else {
      setTimeout(() => {
        res.json({
          status: "succes",
          message: "Kassirlar bo`yicha xisobot",
          error: null,
          data: cashier,
        });
      }, 500);
    }
  }
);
