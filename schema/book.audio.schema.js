const { Schema, model } = require("mongoose");

const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Kitob nomi majburiy"],
    trim: true,
    minlength: [2, "Kitob nomi kamida 2 ta belgidan iborat bo‘lishi kerak"]
  },
  author: {
    type: String,
    required: [true, "Muallif nomi majburiy"]
  },
  genre: {
    type: String,
    required: [true, "Janr majburiy"]
  },
  language: {
    type: String,
    required: [true, "Uz","Ru","En"]
  },
  duration: {
    type: Number,
    min: 1,
    required: true, 
  },
  description: {
    type: String,
    maxlength: [1000, "Tavsif 1000 belgidan oshmasligi kerak"]
  },
  img: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = model("Book", BookSchema);
