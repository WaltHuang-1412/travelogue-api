'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable('UserVerifications', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          userAccountId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.INTEGER,
            references: {
              model: 'UserAccounts',
              key: 'id',
            },
          },
          sendTime: {
            type: Sequelize.DATE,
          },
          purpose: {
            type: Sequelize.INTEGER,
          },
          type: {
            type: Sequelize.CHAR(10),
          },
          code: {
            type: Sequelize.STRING,
          },
          time: {
            type: Sequelize.DATE,
          },
          errorCount: {
            type: Sequelize.INTEGER,
          },
          hasVerified: {
            type: Sequelize.CHAR(10),
          },
          createdUser: {
            type: Sequelize.INTEGER,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedUser: {
            type: Sequelize.INTEGER,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        }),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.dropTable('UserVerifications');
    } catch (error) {
      throw error;
    }
  },
};
