const { Schema, model } = require("mongoose");

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [500, "Bio cannot exceed 500 characters"],
    },
    birthDate: {
      type: Date,
    },
    nationality: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Author", authorSchema);
