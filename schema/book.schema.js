const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
      minlength: [2, "Title must be at least 2 characters"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: [true, "Author is required"],
    },
    genre: {
      type: String,
      trim: true,
    },
    pages: {
      type: Number,
      min: [1, "Book must have at least 1 page"],
    },
    year: {
      type: Number,
      min: [0, "Year cannot be negative"],
    },
    coverImage: {
      type: String, 
    },
  },
  { timestamps: true }
);

module.exports = model("Book", bookSchema);
