const authorValidator = require("../validator/author.validator");

const authorValidatorMiddleware = (req, res, next) => {
  const { error } = authorValidator(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

module.exports = authorValidatorMiddleware;
