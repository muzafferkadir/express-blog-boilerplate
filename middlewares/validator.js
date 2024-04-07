const middleware = (schema, property = 'body') => (req, res, next) => {
  try {
    const result = schema.validate(req[property], { abortEarly: false });

    if (result.error) {
      const { details } = result.error;
      const message = details.map((i) => ({ message: i.message.replace(/['"]/g, "'"), field: i?.context?.label || i?.context?.key }));
      res.sendError(422, message);
    } else {
      next();
    }
  } catch (error) {
    res.sendError(500, error);
  }
};

module.exports = middleware;
