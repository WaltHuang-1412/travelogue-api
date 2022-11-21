const { Sequelize } = require('sequelize');
import Logger from '../../loaders/logger';
import sqlConfig from './sql';
import config from '../../config/index';
import { ISql } from '../../interfaces/ISql';

export default () => {
  const sql: ISql = sqlConfig;
  const { database, username, password, host, port, dialect } = sql[config.nodeEnv];
  const sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    logging: (msg: any) => Logger.debug(msg),
  });
  return sequelize;
};