"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          id: "1",
          name_and_type: "Mercedes Benz G-Class",
          detail: "SUV, Black, 4, Matic",
          stock: 2,
          amount: "4.500.000.000",
          imageUrl: "https://i.ytimg.com/vi/f3-PloBeqM4/maxresdefault.jpg",
          date: new Date(2021, 7, 20),
          createdAt: new Date(),
          updatedAt: new Date(),

          id: "2",
          name_and_type: "Hyundai CRETA Active MT 6-speed ( Active )",
          detail: "SUV, White, 4, Matic",
          stock: 5,
          amount: "350.000.000",
          imageUrl: "https://img.salon.av.by/catalog/hyundai/creta/novaya_kreta/0b/b/1.jpg",
          date: new Date(2020, 1, 7),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
