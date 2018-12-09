'use strict';
module.exports = (sequelize, DataTypes) => {
  var Game_pieces = sequelize.define('game_pieces', {
    //gameId: DataTypes.INTEGER,
    col: DataTypes.INTEGER,
    row: DataTypes.INTEGER,
    pieceId: DataTypes.INTEGER,
    captured: Datatypes.BOOLEAN
  });

  Game.associate = function (models) {
    models.Task.belongsTo(models.Game, {
      onDelete: "CASCADE",
      foreignKey: { 
        allowNull: false
      }
    });
  };

  return Game_pieces;
};
