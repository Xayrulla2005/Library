const { Schema, model } = require("mongoose")

const Author = new Schema({
    full_name: {
        type: String,
        minlength: 3,
        maxlength: 100,
        trim: true,
        match: /^[\p{L}\p{N}\s.,'-]+$/u,
        required: true
    },
    birth_date: {
        type: Date,
        min: new Date("0001-01-01"),
        max: new Date(),
        required: true
    },
    death_date: {
        type: Date,
        min: new Date("0001-01-01"),
        max: new Date(),
        required: true
    },
    img: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        minlength: 3,
        maxlength: 10000,
        trim: true,
        match: /^[\p{L}\p{N}\s.,'"‘’\-–!?]+$/u,
        required: true
    },
    cretivity: {
        type: String,
        minlength: 3,
        maxlength: 10000,
        trim: true,
        match: /^[\p{L}\p{N}\s.,'"‘’\-–!?]+$/u,
        required: true
    },
    region: {
        type: String,
        trim: true,
        match: /^[\p{L}\p{N}\s.,'"‘’\-–!?]+$/u,
        required: true
    },
    period: {
        type: String,
        enum: ['Jadidchilik', 'Mustaqilik', 'SSSR'],
        required: true
    }
},
{
    versionKey: false,
    timestamps: true
})

const AuthorSchema = model("Author", Author)
module.exports = AuthorSchema
