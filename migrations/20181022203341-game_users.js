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
          'game_users',
          {
              
              game_id: {
                type: Sequelize.INTEGER,
                model: {
                            tableName: 'games',
                            schema: 'static'
                        },
                        key: 'game_id',
                        allowNull: false
              
              },
              user_id: {
                type: Sequelize.INTEGER,
                model: {
                            tableName: 'users',
                            schema: 'static'
                        },
                        key: 'user_id',
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
    return queryInterface.dropTable('game_users');
  }
};
