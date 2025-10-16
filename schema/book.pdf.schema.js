const { Schema, model } = require("mongoose");

const PDFBookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Book title is required"],
    trim: true,
    minlength: [2, "Book title must be at least 2 characters long"]
  },
  author: {
    type: String,
    required: [true, "Author name is required"]
  },
  genre: {
    type: String,
    required: [true, "Genre is required"]
  },
  language: {
    type: String,
    enum: ["Uz", "Ru", "En"],
    required: [true, "Language is required"]
  },
  pages: {
    type: Number,
    min: [1, "Book must have at least 1 page"],
    required: [true, "Number of pages is required"]
  },
  fileUrl: {
    type: String,
    required: [true, "PDF file URL is required"]
  },
  description: {
    type: String,
    maxlength: [1000, "Description must not exceed 1000 characters"]
  },
  img: {
    type: String,
    required: [true, "Image URL is required"]
  }
}, {
  timestamps: true
});

module.exports = model("PDFBook", PDFBookSchema);
