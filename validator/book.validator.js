const joi = require("joi")

const bookValidator = (data) => {
    const schema = joi.object({
        title:joi.string().min(2).max(100).required(),
        author:joi.string().min(2).max(50).required(),
        genre:joi.string().min(3).required(),
        pages:joi.number().integer().min(1).required(),
        published_year:joi.number().integer().min(1000).max(new Date().getFullYear()).required(),
        description:joi.string().min(10).max(1000).required(),
        img:joi.string().uri().required(),
        author_info:joi.string().min(10).max(500).optional(),
    })
    return schema.validate(data)
}

module.exports=bookValidator