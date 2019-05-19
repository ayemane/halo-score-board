"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Games",
      [
        {
          id: 1,
          map: "guardian",
          time: new Date(),
          players: "klept0,booskaa",
          winner: "klept0",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          map: "foundry",
          time: new Date(),
          players: "klept0,booskaa",
          winner: "booskaa",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Games", null, {});
  }
};
