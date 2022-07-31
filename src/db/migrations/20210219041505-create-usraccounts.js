'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserAccounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      no: {
        type: Sequelize.STRING,
        unique: true,
      },
      account: {
        type: Sequelize.STRING,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      salt: {
        type: Sequelize.STRING,
      },
      mobile: {
        type: Sequelize.CHAR(20),
      },
      hasVerified: {
        type: Sequelize.CHAR(10),
      },
      verificationTime: {
        type: Sequelize.DATE,
      },
      actFlg: {
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.dropTable('UserAccounts');
    } catch (error) {
      throw error;
    }
  },
};
