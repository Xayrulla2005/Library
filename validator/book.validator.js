const Joi = require("joi");

const bookValidator = (data) =>
  Joi.object({
    title: Joi.string().min(2).max(150).required(),
    author: Joi.string().required(), 
    genre: Joi.string().optional(),
    pages: Joi.number().min(1).optional(),
    year: Joi.number().min(0).max(new Date().getFullYear()).optional(),
    coverImage: Joi.string().uri().optional(),
  }).validate(data);

module.exports = { bookValidator };
