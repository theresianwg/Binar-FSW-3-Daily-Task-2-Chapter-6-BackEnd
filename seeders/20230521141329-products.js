'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [{
    id: "1",
    name_and_type : "Mercedes Benz G-Class",
    detail : "SUV, Black, 4, Matic",
    stock : 2,
    amount : "4.500.000.000",
    imageUrl :"https://th.bing.com/th/id/OIP.W7CQOE1BDKyzl5cquqJLyQHaE7?w=266&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    date: new Date (2021, 7, 20),
    createdAt: new Date(),
    updatedAt: new Date(),

    id: "2",
    name_and_type : "Hyundai CRETA Active MT 6-speed ( Active )",
    detail : "SUV, White, 4, Matic",
    stock : 5,
    amount : "350.000.000",
    imageUrl :"https://th.bing.com/th/id/OIP.W7CQOE1BDKyzl5cquqJLyQHaE7?w=266&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    date: new Date(2020, 1, 7),
    createdAt: new Date(),
    updatedAt: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
