const Joi = require('joi');

const create = Joi.object({
  title: Joi.string().required().min(3).max(100),
  content: Joi.string().required().min(3),
  tags: Joi.array().items(Joi.string()),
});

const list = Joi.object({
  page: Joi.number().min(1),
  limit: Joi.number().min(1).max(100),
});

const update = Joi.object({
  title: Joi.string().min(3).max(100),
  content: Joi.string().min(3),
  tags: Joi.array().items(Joi.string()),
});

module.exports = {
  create, list, update,
};
