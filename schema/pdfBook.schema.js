const { Schema, model } = require("mongoose");

const pdfBookSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    pdfUrl: { type: String, required: [true, "PDF URL is required"] },
  },
  { timestamps: true }
);

module.exports = model("PDFBook", pdfBookSchema);
