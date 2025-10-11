const Joi = require("joi")

const bookValidator = (data) => {
    const schema = Joi.object({
        full_name:Joi.string().min(3).max(100).required(),
        birth_date:Joi.date().less("now").required(),
        death_date:Joi.string().min(1).required(),
        region:Joi.string().min(3).max(100).required(),
        creativity: Joi.string().min(5).max(1000).required(),
         bio:Joi.string().min(30).max(2000).required(),
        img:Joi.string().uri().required(),
        period:Joi.string().min(3).max(500).required(),
    })
    return schema.validate(data)
}

module.exports=bookValidator