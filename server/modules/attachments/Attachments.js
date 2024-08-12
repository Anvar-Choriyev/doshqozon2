const { DataTypes } = require("sequelize");
const Category = require("../category/Category");
const User = require("../user/User");
const sequelize = require("../../core/config/database/database");

const Attachments = sequelize.define(
  "attachments",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    originalName: DataTypes.STRING,
    size: DataTypes.BIGINT,
    type: DataTypes.STRING,
    isConnect : {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  { underscored: true }
);

Attachments.hasMany(User, {
  as: "user",
  foreignKey: "attachmentId",
});
User.belongsTo(Attachments, { as: "attachment" });

module.exports = Attachments;
