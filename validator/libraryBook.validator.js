const Joi = require("joi");

exports.addBookValidator = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  author: Joi.string().min(2).max(100).required(),
  year: Joi.number().min(0),
  genre: Joi.string(),
});

exports.addQuoteValidator = Joi.object({
  text: Joi.string().min(3).max(300).required(),
});
