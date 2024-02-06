const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../Connection/database");
const newUser = sequelize.define("newUser", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 20],
        msg: "Name lenght must be minimum 3",
      },
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 20],
        msg: "LastName lenght must be minimum 3",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  rememberToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  jwtToken: {
    type: DataTypes.STRING,
    //allowNull:false
  },
});
newUser.sync();
module.exports = newUser;
