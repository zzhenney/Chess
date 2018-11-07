'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable(
          'game_pieces',
          {
              gameId: {
                type: Sequelize.INTEGER,
                model: {
                            tableName: 'games',
                            schema: 'static'
                        },
                        key: 'gameId',
                        allowNull: false
              },
              col: {
                type: Sequelize.INTEGER,
                  allowNull: false
              },
              row: {
                type: Sequelize.INTEGER,
                allowNull: false
              },
              pieceId: {
                type: Sequelize.INTEGER,
                model: {
                            tableName: 'pieces',
                            schema: 'static'
                        },
                        key: 'pieceId',
                        allowNull: false
                
              },
              captured: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
              }
          }
      );
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
