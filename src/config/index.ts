import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
// process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  nodeEnv: process.env.NODE_ENV || 'development',

  /**
   * Your favorite port
   */
  port: parseInt(typeof process.env.PORT === 'string' ? process.env.PORT : '3000', 10),

  /**
   * That long string from mlab
   */
  // databaseURL: process.env.MONGODB_URI,

  /**
   * Your secret sauce
   */
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'p4sta.w1th-b0logn3s3-s@uce',
  accessTokenAlgorithm: process.env.ACCESS_TOKEN_ALGO || 'RS256',
  accessTokenLife: process.env.ACCESS_TOKEN_LIFE || 15,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'p4sta.w1th-b0logn3s3-s@uce',
  refreshTokenAlgorithm: process.env.REFRESH_TOKEN_ALGO || 'RS256',
  refreshTokenLife: process.env.REFRESH_TOKEN_LIFE || 15,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  /**
   * Agenda.js stuff
   */
  // agenda: {
  //   dbCollection: process.env.AGENDA_DB_COLLECTION,
  //   pooltime: process.env.AGENDA_POOL_TIME,
  //   concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
  // },

  /**
   * Agendash config
   */
  // agendash: {
  //   user: 'agendash',
  //   password: '123456'
  // },
  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
  /**
   * Mailgun email credentials
   */
  emails: {
    SMTP: {
      account: process.env.MAIL_SMTP_ACCOUNT,
      password: process.env.MAIL_SMTP_PASSWORD,
    },
  },
};
