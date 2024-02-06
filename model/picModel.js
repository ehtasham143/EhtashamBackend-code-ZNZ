const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../Connection/database");
const pics = sequelize.define("pics", {
  text: {
    type: DataTypes.STRING,
  },
  picAddress: {
    type: DataTypes.STRING,
  },
});
pics.sync();
module.exports = pics;
