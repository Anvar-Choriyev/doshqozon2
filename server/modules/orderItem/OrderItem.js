const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/database/database");
const FoodItem = require("../foodItem/FoodItem");
const Order = require("../order/Order");

const OrderItem = sequelize.define(
  "orderItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemTotalPrice: {
      type: DataTypes.INTEGER,
    },
  },
  {
    underscored: true,
  }
);
FoodItem.hasOne(OrderItem, {
  as: "orderItem",
  foreignKey: "foodItemId",
});
OrderItem.belongsTo(FoodItem, { as: "foodItem" });

Order.hasMany(OrderItem, {
  as: "orderItems",
  foreignKey: "orderId",
});
OrderItem.belongsTo(Order, { as: "order" });
module.exports = OrderItem;
