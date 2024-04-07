require('dotenv').config();
const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const validator = require('../middlewares/validator');
const { login } = require('../validators/user');

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;
const EXPIRATION = '2h';
router.post('/login', validator(login), async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      res.sendError(401, 'Username or password is incorrect.');
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.sendError(401, 'Username or password is incorrect.');
      return;
    }

    const token = jwt.sign(
      { username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: EXPIRATION },
    );

    res.sendResponse(200, { token });
  } catch (error) {
    res.sendError(500, error);
  }
});

module.exports = router;
