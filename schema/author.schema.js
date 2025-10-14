const { Schema, model } = require("mongoose");

const AuthorSchema = new Schema({
  full_name: {
    type: String,
    required: [true, "Muallif ismi majburiy"],
    trim: true,
    minlength: [3, "Ism kamida 3 ta belgidan iborat bo‘lishi kerak"]
  },
  birth_date: {
    type: Date,
    required: [true, "Tug‘ilgan sana majburiy"]
  },
  death_date: {
    type: Date,
    validate: {
      validator: function (v) {
        return !v || v > this.birth_date;
      },
      message: "O‘lim sanasi tug‘ilgan sanadan oldin bo‘lishi mumkin emas"
    }
  },
  img: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    maxlength: [1000, "Biografiya 1000 belgidan oshmasligi kerak"]
  },
  creativity: {
    type: String,
    trim: true,
  },
  region: {
    type: String,
    trim: true,
  },
  period: {
    type: String,
    trim: true,
  }
},
{
  versionKey: false,
  timestamps: true
});

module.exports = model("Author", AuthorSchema);
