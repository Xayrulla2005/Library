const { Schema, model } = require("mongoose");

const audioBookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Audio book title is required"],
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    audioUrl: {
      type: String,
      required: [true, "Audio file URL is required"],
    },
    duration: {
      type: String, 
    },
  },
  { timestamps: true }
);

module.exports = model("AudioBook", audioBookSchema);
