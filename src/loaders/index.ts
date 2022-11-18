import expressLoader from './express';
import { Application } from 'express';
import sequelizeSqliteLoader from '../db/sqlite/index';
import swaggerLoader from './swagger';
// import dependencyInjectorLoader from './dependencyInjector';
// import mongooseLoader from './mongoose';
// import jobsLoader from './jobs';
import Logger from './logger';
// import login from 'api/routes/login';
//We have to import at least all the events once so they can be triggered
// import './events';

interface defaultInit {
  expressApp: Application;
}

export default async (init: defaultInit) => {
  // const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and sqlite connected!');
  const sequelizeSqlite = sequelizeSqliteLoader();
  const sequelizeSqliteConnection = await sequelizeSqlite.authenticate();
  Logger.info('✌️ DB loaded and sqlite connected!');
  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */

  // const userModel = {
  //   name: 'userModel',
  //   // Notice the require syntax and the '.default'
  //   model: require('../models/user').default,
  // };

  // It returns the agenda instance because it's needed in the subsequent loaders
  // const { agenda } = await dependencyInjectorLoader({
  //   mongoConnection,
  //   models: [
  //     userModel,
  //     // salaryModel,
  //     // whateverModel
  //   ],
  // });
  // Logger.info('✌️ Dependency Injector loaded');

  // await jobsLoader({ agenda });
  // Logger.info('✌️ Jobs loaded');

  await swaggerLoader({ app: init.expressApp });
  Logger.info('✌️ Swagger loaded');

  await expressLoader({ app: init.expressApp });
  Logger.info('✌️ Express loaded');
};
