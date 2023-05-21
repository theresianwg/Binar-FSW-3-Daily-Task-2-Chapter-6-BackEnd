'use strict';
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashPassword = await bcrypt.hash("rahasia", 10);
    return queryInterface.bulkInsert('users', [{
      id : 1,
      username : "ciwang",
      password: hashPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
