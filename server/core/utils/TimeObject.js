const { Op } = require("sequelize");
class Time {
  constructor(query, queryData) {
    this.query = query;
    this.queryData = queryData;
  }

  getTimes() {
    const nowDate = new Date();
    let year = nowDate.getFullYear();
    let hours = nowDate.getHours();
    let minut = nowDate.getMinutes();
    let secund = nowDate.getSeconds();
    let weekday =
      nowDate.getDay() === 0 ? 7 : nowDate.getDay();
    let day = nowDate.getDate();
    let lastDay = nowDate.getDate();
    let month = nowDate.getMonth() + 1;
    let lastMonth = nowDate.getMonth() + 1;
    let result = 0;
    if (this.query === "year") {
      month = 1;
      day = 1;
    } else if (this.query === "yesterday") {
      day = day - 1;
      lastDay = lastDay - 1;
      hours = 23;
      minut = 59;
      secund = 59;
    } else if (this.query === "month") {
      day = 1;
    } else if (this.query === "week") {
      if (day < weekday) {
        result = weekday - day - 1;
        month = month - 1;
        month === 1 || 3 || 5 || 7 || 8 || 10 || 12
          ? (day = 31)
          : month === 4 || 6 || 9 || 11
          ? (day = 30)
          : year % 4 === 0
          ? (day = 29)
          : (day = 28);
        day = day - result;
      } else {
        day = day - weekday + 1;
      }
    }
    let time = {
      start: new Date(
        `${
          this.queryData?.start ||
          year + "-" + month + "-" + day
        } 00:00:00.000+00`
      ),
      end: new Date(
        `${
          this.queryData?.end ||
          year + "-" + lastMonth + "-" + lastDay
        } ${hours || 23}:${minut || 59}:${
          secund || 59
        }.000+00`
      ),
    };

    return time;
  }
}
module.exports = Time;
