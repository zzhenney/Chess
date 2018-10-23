'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    var gameState = [0, 1, 3, 4, 6, 7];
    return queryInterface.bulkInsert('games', [
      { boardState: gameState, isNext: 0, isWhite: 0},
      { boardState: gameState, isNext: 1, isWhite: 0}
      ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
