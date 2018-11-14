'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.bulkInsert('game_pieces', [
      { gameId: 1, col: 0, row: 3, pieceId: 1},
      { gameId: 1, col: 1, row: 2, pieceId: 2},
      { gameId: 1, col: 4, row: 6, pieceId: 3},
      ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('game_pieces');
  }
};
