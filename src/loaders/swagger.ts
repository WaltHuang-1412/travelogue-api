import express, { Application, Request, Response, NextFunction } from 'express';
const expressSwaggerGenerator = require('express-swagger-generator');
import config from '../config';

export default ({ app }: { app: Application }) => {
  const expressSwagger = expressSwaggerGenerator(app);
  let options = {
    swaggerDefinition: {
      info: {
        description: 'This is a sample server',
        title: 'Swagger',
        version: '0.1.0',
      },
      host: 'localhost:3000',
      basePath: `${config.api.prefix}/`,
      produces: ['application/json', 'application/xml'],
      schemes: ['http', 'https'],
      securityDefinitions: {
        JWT: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'test description',
        },
      },
    },
    basedir: __dirname, //app absolute path
    files: ['../api/routes/*.ts','../api/routes/*.js'], //Path to the API handle folder
  };
  expressSwagger(options);
};
