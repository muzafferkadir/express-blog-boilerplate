require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0', autoHeaders: false });

const doc = {
  info: {
    title: 'API Documentation for Blog App',
  },
  host: `${process.env.HOST}:${process.env.PORT}`,
  securityDefinitions: {
    AuthToken: {
      type: 'apiKey',
      name: 'authorization',
      in: 'header',
      description: 'The token for authentication',
    },
  },
  security: [
    {
      AuthToken: [],
    },
  ],
  schemes: ['http', 'https'],
  servers: [
    {
      url: 'https://express-blog-boilerplate.onrender.com/',
      description: 'dev server',
    },
    {
      url: 'http://0.0.0.0:3000/',
      description: 'local server',
    },
  ],
};

const outputFile = './swagger-output.json';
const routes = ['./app.js'];

// To generate the swagger file run npm run swagger (old file will be overwritten!)
swaggerAutogen(outputFile, routes, doc);
