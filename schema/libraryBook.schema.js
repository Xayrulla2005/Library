const { Schema, model } = require("mongoose");

const libraryBookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    availableCopies: { type: Number, default: 1, min: [0, "Copies cannot be negative"] },
  },
  { timestamps: true }
);

module.exports = model("LibraryBook", libraryBookSchema);
