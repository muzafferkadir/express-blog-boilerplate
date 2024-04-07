require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.sendError(401, 'Unauthorized access: No token provided');
    return;
  }

  let token;
  if (req.headers.authorization.startsWith('Bearer ')) {
    [, token] = req.headers.authorization.split(' ');
  } else {
    token = req.headers.authorization;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.sendError(401, 'Unauthorized access: Invalid token');
  }
};

module.exports = verifyToken;
