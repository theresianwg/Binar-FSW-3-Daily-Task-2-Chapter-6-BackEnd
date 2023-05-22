"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    static associate(models) {
      // define association here
    }
  }
  products.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Tambahkan baris ini
        autoIncrement: true,
      },
      name_and_type: DataTypes.STRING,
      detail: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      amount: DataTypes.STRING,
      imageUrl: DataTypes.TEXT,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "products",
    }
  );

  // define association here
  products.associate = function (models) {
    // relation/associate users -> products
    products.belongsTo(models.users);
  };

  return products;
};
