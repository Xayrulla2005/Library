const Joi = require("joi");

const authorValidator = (data) =>
  Joi.object({
    name: Joi.string().min(2).max(100).required(),
    bio: Joi.string().max(500).optional(),
    birthDate: Joi.date().optional(),
    nationality: Joi.string().max(50).optional(),
  }).validate(data);

module.exports = { authorValidator };
