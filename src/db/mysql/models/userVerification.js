'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = sequelize => {
  class UserVerification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserVerification.init(
    {
      userAccountId: {
        type: DataTypes.INTEGER,
      },
      sendTime: {
        type: DataTypes.DATE,
      },
      purpose: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      type: {
        type: DataTypes.CHAR(10),
        defaultValue: 1,
      },
      code: {
        type: DataTypes.STRING,
      },
      time: {
        type: DataTypes.DATE,
      },
      errorCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      hasVerified: {
        type: DataTypes.CHAR(10),
        validate: {
          isIn: [[0, 1, 2]],
        },
        defaultValue: 0,
      },
      createdUser: {
        type: DataTypes.INTEGER,
      },
      updatedUser: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'UserVerification',
    },
  );
  return UserVerification;
};
