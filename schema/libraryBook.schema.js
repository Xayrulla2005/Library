const mongoose = require("mongoose");

const LibraryBookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: Number,
    genre: {
      type: String,
      enum: ["Drama", "Fantasy", "Romance", "Detective", "Other"],
      default: "Other",
    },
    quotes: [
      {
        text: { type: String, required: true },
        addedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        addedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("LibraryBook", LibraryBookSchema);
