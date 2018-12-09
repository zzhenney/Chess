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
          'games',
          {
              id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
              },
              createAt: {
                type: Sequelize.DATE,
                  defaultValue: Sequelize.literal('NOW()'),
                  allowNull: false
              },
              nextUserId: {
                type: Sequelize.INTEGER,
                  allowNull: true
              },
              whiteUserId: {
                type: Sequelize.INTEGER,
                allowNull: true
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
    return queryInterface.dropTable('games');
  }
};
