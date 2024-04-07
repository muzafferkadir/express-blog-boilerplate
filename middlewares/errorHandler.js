/* eslint-disable no-param-reassign */
const { errorLogger, logger } = require('../utils/logger');

module.exports = (req, res, statusCode = 500, data = {}) => {
  try {
    if (typeof data !== 'object') {
      data = { message: data };
    }

    if (data?.code === 11000 || data?.code === 11001 || data?.code === 12582) {
      statusCode = 409;
      data = { message: 'This record is already exist.' };
    }

    if (data instanceof Error) {
      data = { message: data.message || 'Something went wrong.' };
    }

    if (JSON.stringify(data) === '{}') {
      res.sendStatus(500);
      errorLogger.error(data);
      logger.error(data);
      return;
    }

    res.status(statusCode);
    res.json(data);
    res.end();

    errorLogger.error(data);
    logger.error(data);
  } catch (error) {
    logger.error(error);
  }
};
