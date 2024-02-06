const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../Connection/database");
const files = sequelize.define("files", {
  File: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM("pending", "accepted", "rejected"),
  },
  deleted: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true,
    validate: {
      len: {
        args: [11, 11],
        msg: "phone number lenght must be minimum 11",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true,
    validate: {
      isEmail: true,
    },
  },
  qualification: {
    type: DataTypes.STRING,
  },
  CNIC: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true,
    validate: {
      len: {
        args: [13, 13],
        msg: "CNIC lenght must be 13",
      },
    },
  },
});
files.sync();
module.exports = files;
