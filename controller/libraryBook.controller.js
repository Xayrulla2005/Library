const LibraryBook = require("../schema/libraryBook.schema");
const Author = require("../schema/author.schema");
const CustomErrorHandler = require("../error/custom.error.handler");

const getAllLibraryBooks = async (req, res, next) => {
  try {
    const books = await LibraryBook.find().populate("author", "name");
    res.status(200).json({ success: true, count: books.length, data: books });
  } catch (error) {
    next(error);
  }
};

const addLibraryBook = async (req, res, next) => {
  try {
    const { title, author, availableCopies } = req.body;

    const authorExist = await Author.findById(author);
    if (!authorExist) return next(CustomErrorHandler.NotFound("Author not found"));

    const newBook = await LibraryBook.create({ title, author, availableCopies });
    res.status(201).json({ success: true, message: "Library book added", data: newBook });
  } catch (error) {
    next(error);
  }
};

const deleteLibraryBook = async (req, res, next) => {
  try {
    const deleted = await LibraryBook.findByIdAndDelete(req.params.id);
    if (!deleted) return next(CustomErrorHandler.NotFound("Library book not found"));
    res.status(200).json({ success: true, message: "Library book deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllLibraryBooks, addLibraryBook, deleteLibraryBook };
