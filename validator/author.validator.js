const Joi = require("joi");

const authorValidator = (data) => {
  const schema = Joi.object({
    full_name: Joi.string().min(3).max(100).required().messages({
      "string.empty": "Muallif ismi majburiy",
      "string.min": "Ism kamida 3 ta belgidan iborat bo‘lishi kerak"
    }),

    birth_date: Joi.date().less("now").required().messages({
      "date.less": "Tug‘ilgan sana hozirgi sanadan kichik bo‘lishi kerak"
    }),

    death_date: Joi.date().greater(Joi.ref("birth_date")).optional().messages({
      "date.greater": "O‘lim sanasi tug‘ilgan sanadan keyin bo‘lishi kerak"
    }),

    region: Joi.string().min(3).max(100).required(),

    creativity: Joi.string().min(5).max(1000).required(),

    bio: Joi.string().min(30).max(2000).required(),

    img: Joi.string().uri().optional(),

    period: Joi.string().min(3).max(500).required()
  });

  return schema.validate(data);
};

module.exports = authorValidator;
