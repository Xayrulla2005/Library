const Joi = require("joi");

const registerValidator = (data) =>
  Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(50).required(),
  }).validate(data);

const loginValidator = (data) =>
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(50).required(),
  }).validate(data);

module.exports = { registerValidator, loginValidator };
