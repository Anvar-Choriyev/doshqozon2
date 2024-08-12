const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/database/database");
const Attachments = require("../attachments/Attachments");
const foodStatus = require("../../core/constants/foodStatus");

const Food = sequelize.define(
  "foods",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
    }
  },
  {
    underscored: true,
  }
);

Attachments.hasOne(Food, {
  as: "food",
  foreignKey: "attachmentId",
});
Food.belongsTo(Attachments, { as: "attachment" });

module.exports = Food;
