const { Sequelize } = require("sequelize");
const vars = process.env;

let isLog;
vars.DB_LOGGING === "true"
  ? (isLog = true)
  : (isLog = false);

const dbConfig = {
  host: vars.DB_HOST,
  port: vars.DB_PORT,
  database: vars.DB_DATABASE,
  username: vars.DB_USER,
  password: vars.DB_PASSWORD,
  dialect: vars.DB_DIALECT,
  logging: isLog,
};

const sequelize = new Sequelize(dbConfig);
module.exports = sequelize;
