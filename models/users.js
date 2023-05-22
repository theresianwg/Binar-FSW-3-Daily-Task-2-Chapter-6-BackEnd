"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Tambahkan baris ini
        autoIncrement: true,
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    }
  );

  // define association/relation here
  users.associate = function (models) {
    users.hasOne(models.products, {
      foreignKey: "userId",
    });
  };

  return users;
};
