"use strict";
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define(
    "Player",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      name: DataTypes.STRING,
      avatar: DataTypes.STRING
    },
    {}
  );
  Player.associate = function(models) {
    // associations can be defined here
  };
  return Player;
};
