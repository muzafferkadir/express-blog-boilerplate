const Joi = require('joi');

const login = Joi.object({
  username: Joi.string().required().min(3).max(30),
  password: Joi.string().required().min(6).max(30),
});

const register = Joi.object({
  username: Joi.string().required().min(3).max(30),
  password: Joi.string().required().min(6).max(30),
});

module.exports = {
  login, register,
};
