const Book = require("../schema/book.schema");
const Author = require("../schema/author.schema");
const CustomErrorHandler = require("../error/custom.error.handler");
const { bookValidator } = require("../validator/book.validator");

// ===================== GET ALL BOOKS =====================
const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find().populate("author", "name nationality").sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

// ===================== GET SINGLE BOOK =====================
const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate("author", "name bio nationality");
    if (!book) return next(CustomErrorHandler.NotFound("Book not found"));
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
};

// ===================== ADD BOOK (ADMIN ONLY) =====================
const addBook = async (req, res, next) => {
  try {
    const { error } = bookValidator(req.body);
    if (error) return next(CustomErrorHandler.BadRequest(error.details[0].message));

    // Check if author exists
    const authorExists = await Author.findById(req.body.author);
    if (!authorExists) return next(CustomErrorHandler.NotFound("Author not found"));

    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

// ===================== UPDATE BOOK (ADMIN ONLY) =====================
const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = bookValidator(req.body);
    if (error) return next(CustomErrorHandler.BadRequest(error.details[0].message));

    const updated = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return next(CustomErrorHandler.NotFound("Book not found"));

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// ===================== DELETE BOOK (ADMIN ONLY) =====================
const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.findByIdAndDelete(id);
    if (!book) return next(CustomErrorHandler.NotFound("Book not found"));

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllBooks, getBookById, addBook, updateBook, deleteBook };
