/* eslint-disable no-param-reassign */
const { logger } = require('../utils/logger');

module.exports = (res, statusCode = 200, data = {}) => {
  try {
    if (typeof data !== 'object') {
      data = { message: data };
    }

    if (typeof statusCode !== 'number') {
      statusCode = 500;
    }

    res.status(statusCode);
    res.json(data);
    res.end();

    logger.info({
      status: statusCode,
      data,
    });
  } catch (error) {
    logger.error(error);
    res.status(500);
    res.json({ message: 'Internal Server Error' });
    res.end();
  }
};
