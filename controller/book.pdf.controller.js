const PDFBook = require("../schema/book.pdf.schema");
const CustomErrorHendler = require("../error/custom.error.handlaer");


// GET ALL
const getAllPDFBooks = async (req, res, next) => {
  try {
    const books = await PDFBook.find();
    res.status(200).json(books);
  } catch (err) {
    next(CustomErrorHendler.BadRequest("Failed to retrieve PDF books", err));
  }
};


// GET ONE
const getPDFBookById = async (req, res, next) => {
  try {
    const book = await PDFBook.findById(req.params.id);
    if (!book) {
      return next(CustomErrorHendler.NotFound("PDF book not found"));
    }
    res.status(200).json(book);
  } catch (err) {
    next(CustomErrorHendler.BadRequest("Invalid ID format", err));
  }
};


// ADD
const addPDFBook = async (req, res, next) => {
  try {
    const newBook = await PDFBook.create(req.body);
    res.status(201).json({ message: "PDF book added successfully", data: newBook });
  } catch (err) {
    next(CustomErrorHendler.BadRequest("Failed to add PDF book", err));
  }
};


// UPDATE
const updatePDFBook = async (req, res, next) => {
  try {
    const updated = await PDFBook.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return next(CustomErrorHendler.NotFound("PDF book not found"));
    }
    res.status(200).json({ message: "PDF book updated successfully", data: updated });
  } catch (err) {
    next(CustomErrorHendler.BadRequest("Failed to update PDF book", err));
  }
};


// DELETE
const deletePDFBook = async (req, res, next) => {
  try {
    const deleted = await PDFBook.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return next(CustomErrorHendler.NotFound("PDF book not found"));
    }
    res.status(200).json({ message: "PDF book deleted successfully" });
  } catch (err) {
    next(CustomErrorHendler.BadRequest("Failed to delete PDF book", err));
  }
};


module.exports = {
  getAllPDFBooks,
  getPDFBookById,
  addPDFBook,
  updatePDFBook,
  deletePDFBook
};
