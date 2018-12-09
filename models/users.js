'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('games', {
    //id: sequelize.INTEGER,
   // createAt: DataTypes.DATE,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    wins: DataTypes.INTEGER,
    losses: DataTypes.INTEGER
  });

  Game.associate = function(models) {
    models.User.hasMany(models.games);
  };

  return users;
};

