"use strict";
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define(
    "Game",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      players: DataTypes.STRING,
      map: DataTypes.STRING,
      time: DataTypes.DATE,
      winner: DataTypes.STRING
    },
    {}
  );
  Game.associate = function(models) {
    // associations can be defined here
  };
  return Game;
};
