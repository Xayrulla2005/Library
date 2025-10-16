const PDFBook = require("../schema/pdfBook.schema");
const Author = require("../schema/author.schema");
const CustomErrorHandler = require("../error/custom.error.handler");

const getAllPDFBooks = async (req, res, next) => {
  try {
    const books = await PDFBook.find().populate("author", "name");
    res.status(200).json({ success: true, count: books.length, data: books });
  } catch (error) {
    next(error);
  }
};

const addPDFBook = async (req, res, next) => {
  try {
    const { title, author, pdfUrl } = req.body;
    const authorExist = await Author.findById(author);
    if (!authorExist) return next(CustomErrorHandler.NotFound("Author not found"));

    const pdfBook = await PDFBook.create({ title, author, pdfUrl });
    res.status(201).json({ success: true, message: "PDF book added", data: pdfBook });
  } catch (error) {
    next(error);
  }
};

const deletePDFBook = async (req, res, next) => {
  try {
    const deleted = await PDFBook.findByIdAndDelete(req.params.id);
    if (!deleted) return next(CustomErrorHandler.NotFound("PDF book not found"));
    res.status(200).json({ success: true, message: "PDF book deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllPDFBooks, addPDFBook, deletePDFBook };
