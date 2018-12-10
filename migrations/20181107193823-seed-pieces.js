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
      { name: 'rook',   default_col: 0, default_row: 0}, //id 1
      { name: 'knight', default_col: 1, default_row: 0}, 
      { name: 'bishop', default_col: 2, default_row: 0},
      { name: 'queen',  default_col: 3, default_row: 0},
      { name: 'king',   default_col: 4, default_row: 0},
      { name: 'bishop', default_col: 5, default_row: 0},
      { name: 'knight', default_col: 6, default_row: 0},
      { name: 'rook',   default_col: 7, default_row: 0}, //id 8
      { name: 'pawn',   default_col: 0, default_row: 1}, //pawns id 9 -18
      { name: 'pawn',   default_col: 1, default_row: 1},
      { name: 'pawn',   default_col: 2, default_row: 1},
      { name: 'pawn',   default_col: 3, default_row: 1},
      { name: 'pawn',   default_col: 4, default_row: 1},
      { name: 'pawn',   default_col: 5, default_row: 1},
      { name: 'pawn',   default_col: 6, default_row: 1},
      { name: 'pawn',   default_col: 7, default_row: 1}, // id 18
      { name: 'rook',   default_col: 0, default_row: 7},
      { name: 'knight', default_col: 1, default_row: 7},
      { name: 'bishop', default_col: 2, default_row: 7},
      { name: 'queen',  default_col: 3, default_row: 7},
      { name: 'king',   default_col: 4, default_row: 7},
      { name: 'bishop', default_col: 5, default_row: 7},
      { name: 'knight', default_col: 6, default_row: 7},
      { name: 'rook',   default_col: 7, default_row: 7},
      { name: 'pawn',   default_col: 0, default_row: 6},
      { name: 'pawn',   default_col: 1, default_row: 6},
      { name: 'pawn',   default_col: 2, default_row: 6},
      { name: 'pawn',   default_col: 3, default_row: 6},
      { name: 'pawn',   default_col: 4, default_row: 6},
      { name: 'pawn',   default_col: 5, default_row: 6},
      { name: 'pawn',   default_col: 6, default_row: 6},
      { name: 'pawn',   default_col: 7, default_row: 6},
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
