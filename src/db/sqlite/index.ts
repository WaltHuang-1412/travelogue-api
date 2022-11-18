const { Sequelize } = require('sequelize');
import Logger from '../../loaders/logger';

export default () => {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../../../test-db.sqlite',
    logging: (msg: any) => Logger.debug(msg),
  });
  return sequelize;
};
