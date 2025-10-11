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
  pages: {
    type: Number,
    min: [1, "Kitob sahifalari soni 1 dan kam bo‘lishi mumkin emas"],
    required: [true, "Sahifalar soni majburiy"]
  },
  published_year: {
    type: Date,
    required: [true, "Nashr yili majburiy"],
    validate: {
      validator: function (v) {
        return v <= new Date();
      },
      message: "Nashr sanasi kelajakda bo‘lishi mumkin emas"
    }
  },
  description: {
    type: String,
    maxlength: [1000, "Tavsif 1000 belgidan oshmasligi kerak"]
  },
  img: {
    type: String,
    default: "",
  },
  author_info: {
    type: Schema.Types.ObjectId,
    ref: "Author",
    required: [true, "Muallif ID majburiy"]
  }
}, {
  timestamps: true
});

module.exports = model("Book", BookSchema);
