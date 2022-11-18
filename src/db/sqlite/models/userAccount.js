'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = sequelize => {
  class UserAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserAccount.init(
    {
      no: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      account: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmil: true,
        },
      },
      mobile:{
        type:DataTypes.CHAR(10),

      },
      hasVerified: {
        type: DataTypes.CHAR(10),
        allowNull: false,
        defaultValue: 0,
      },
      verificationTime: {
        type: DataTypes.DATE,
      },
      actFlg: {
        type: DataTypes.CHAR(10),
        allowNull: false,
        defaultValue: 0,
      },
      createdUser: {
        type: DataTypes.INTEGER,
      },
      updatedUser: {
        type: DataTypes.INTEGER,
      },
      salt: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'UserAccount',
    },
  );
  return UserAccount;
};
