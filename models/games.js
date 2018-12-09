'use strict';
module.exports = (sequelize, DataTypes) => {
  var games = sequelize.define('games', {
    //id: DataTypes.INTEGER,
    // createAt: DataTypes.DATE,
    nextUser: DataTypes.INTEGER,
    whiteUserId: DataTypes.INTEGER
  });

  games.associate = function (models) {
    models.games.belongsTo(models.Users, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return games;
};
