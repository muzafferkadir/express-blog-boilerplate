require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Error Handler
const errorHandler = require('./middlewares/errorHandler');

app.use((req, res, next) => {
  res.sendError = errorHandler.bind(null, req, res);
  next();
});

// Response Handler
const responseHandler = require('./middlewares/responseHandler');

app.use((req, res, next) => {
  res.sendResponse = responseHandler.bind(null, res);
  next();
});

// DB
const mongoDB = process.env.DATABASE_URL;
mongoose.connect(mongoDB);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Routes
app.use('/user', require('./routes/user'));
app.use('/post', require('./routes/post'));

// Swagger
try {
  // eslint-disable-next-line global-require
  app.use('/doc', swaggerUi.serve, swaggerUi.setup(require('./swagger-output.json')));
} catch (err) {
  console.error('Check swagger-output.json file is exist. Run `npm run swagger` to generate it.');
}

// 404
app.use((req, res) => { res.status(404).send(null); });

// Create Admin Initially
const createAdmin = require('./utils/createAdmin');

if (process.env.CREATE_ADMIN_INITIALLY === 'true') {
  createAdmin();
}

// Logger
const { logger } = require('./utils/logger');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
app.listen(PORT, HOST, () => {
  logger.info(`Server running at http://${HOST}:${PORT}/`);
});

module.exports = app;
