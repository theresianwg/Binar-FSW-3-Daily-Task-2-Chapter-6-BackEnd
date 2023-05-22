"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          id: "1",
          name_and_type: "Mercedes Benz",
          detail: "SUV, Black, 4, Matic",
          stock: 2,
          amount: "4000000",
          imageUrl: "https://ik.imagekit.io/publicurl/IMG_1684753334470_vTBiurDoW.png",
          date: new Date(2021, 7, 20),
          createdAt: new Date(),
          updatedAt: new Date(),

          id: "2",
          name_and_type: "Hyundai CRETA Active",
          detail: "SUV, White, 4, Matic",
          stock: 5,
          amount: "3000000",
          imageUrl: "https://ik.imagekit.io/publicurl/IMG_1684747695215_8x7Oi-xmV.png",
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
