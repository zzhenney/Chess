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
          'active-games',
          {
              activeGamesId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
              },
              createAt: {
                type: Sequelize.DATE,
                  defaultValue: Sequelize.literal('NOW()'),
                  allowNull: false
              },
              gameId: {
                type: Sequelize.INTEGER,
                model: {
                            tableName: 'games',
                            schema: 'static'
                        },
                        key: 'gameId',
                        allowNull: false
              
              },
              userId: {
                type: Sequelize.ARRAY(Sequelize.INTEGER),
                model: {
                            tableName: 'users',
                            schema: 'static'
                        },
                        key: 'userId',
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
    return queryInterface.dropTable('active-games');
  }
};
