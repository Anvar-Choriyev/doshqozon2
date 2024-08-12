const { Op } = require("sequelize");
// const dayjs = require("dayjs")

const excludeParams = [
  "page",
  "size",
  "fields",
  "search",
  "sort",
];
const operators = ["gte", "gt", "lt", "lte", "in", "eq"];

class QueryBuilder {
  constructor(queryParams) {
    this.queryParams = queryParams;
    this.queryOptions = {};
  }

  filter() {
    const filterFields = { ...this.queryParams };
    excludeParams.forEach(p => delete filterFields[p]);
    const filterObject = {};
    Object.keys(filterFields).forEach(k => {
      const filterItem = filterFields[k];
      if (typeof filterItem === "object") {
        Object.keys(filterItem).forEach(ik => {
          if (Object.keys(filterFields[k]).length > 1) {
            if (
              Object.keys(filterFields[k])[0] === "gte" &&
              Object.keys(filterFields[k])[1] === "lte"
            ) {
              const filteredItem =
                Object.values(filterItem);
              filterObject[k] = {
                //    [Op["gte"]]: dayjs(`${filteredItem[0]}`).startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
                //    [Op["lte"]]: dayjs(`${filteredItem[1]}`).endOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
              };
              return;
            }
            if (filterObject[k]) {
              filterObject[k] = {
                ...{ [Op[ik]]: filterItem[ik] },
                ...filterObject[k],
              };
            } else {
              filterObject[k] = {
                [Op[ik]]: filterItem[ik],
              };
            }
            return;
          }
          if (Object.keys(filterFields[k])[0] === "in") {
            filterObject[k] = {
              [Op[ik]]: filterItem[ik].split(","),
            };
            return;
          }
          if (Object.keys(filterFields[k])[0] === "eq") {
            console.log("dfsdsfdfs");
            filterObject[k] = {
              [Op["gte"]]: filterItem[ik],
              //    [Op["lte"]]: dayjs(`${filterItem[ik]}`).endOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
            };
            return;
          }
          if (operators.includes(ik)) {
            filterObject[k] = { [Op[ik]]: filterItem[ik] };
          }
        });
      } else {
        filterObject[k] = { [Op.eq]: filterItem };
      }
    });
    if (this.queryOptions.where) {
      this.queryOptions.where = {
        ...filterObject,
        ...this.queryOptions.where,
      };
    } else {
      this.queryOptions.where = filterObject;
    }
    return this;
  }
  search(searchFields) {
    if (!this.queryParams.search) return this;
    const searchObj = {
      [Op.or]: searchFields.map(field => ({
        [field]: {
          [Op.iLike]: `%${this.queryParams.search}%`,
        },
      })),
    };
    if (this.queryOptions.where) {
      this.queryOptions.where = {
        ...searchObj,
        ...this.queryOptions.where,
      };
    } else {
      this.queryOptions.where = searchObj;
    }
    return this;
  }
}

module.exports = QueryBuilder;
