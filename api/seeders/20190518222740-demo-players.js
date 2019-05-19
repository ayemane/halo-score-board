"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Players",
      [
        {
          id: "klept0",
          name: "klept0",
          avatar: "http://akilasyemane.com/avatar/Akilas150.png",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "booskaa",
          name: "booskaa",
          avatar: "http://akilasyemane.com/avatar/Akilas150.png",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
