const { Schema, model } = require("mongoose");

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10000,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: true,
    enum: [
      'Fiction', 'Non-Fiction', 'Science', 'History',
      'Biography', 'Fantasy', 'Mystery', 'Romance',
      'Thriller', 'Horror', 'Self-Help', 'Other'
    ]
  },
  pages: {
    type: Number,
    required: true,
    min: 1,
    max: 10000
  },
  published_year: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    match: /^[\p{L}\p{N}\s.,'"‘’\-–!?]+$/u
  },
  img: {
    type: String,
    required: true
  },
 author_info: {
  type: Schema.Types.ObjectId,
  ref: "Author",
  required: true
}

}, {
  timestamps: true
});

module.exports = model("Book", BookSchema);
