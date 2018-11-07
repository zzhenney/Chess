'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.bulkInsert('pieces', [
      { name: 'pawn', default_col: 0, default_row: 1},
      { name: 'pawn', default_col: 1, default_row: 1},
      { name: 'pawn', default_col: 2, default_row: 1},
      { name: 'pawn', default_col: 3, default_row: 1},
      { name: 'pawn', default_col: 4, default_row: 1},
      { name: 'pawn', default_col: 5, default_row: 1},
      { name: 'pawn', default_col: 6, default_row: 1},
      { name: 'pawn', default_col: 7, default_row: 1},
      ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('pieces');
  }
};
