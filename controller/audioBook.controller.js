const AudioBook = require("../schema/audioBook.schema");
const Author = require("../schema/author.schema");
const CustomErrorHandler = require("../error/custom.error.handler");

// Get all audiobooks
const getAllAudioBooks = async (req, res, next) => {
  try {
    const books = await AudioBook.find().populate("author", "name");
    res.status(200).json({ success: true, count: books.length, data: books });
  } catch (error) {
    next(error);
  }
};

// Add audiobook (Admin only)
const addAudioBook = async (req, res, next) => {
  try {
    const { title, author, audioUrl, duration } = req.body;

    const authorExist = await Author.findById(author);
    if (!authorExist) return next(CustomErrorHandler.NotFound("Author not found"));

    const book = await AudioBook.create({ title, author, audioUrl, duration });
    res.status(201).json({ success: true, message: "Audio book added", data: book });
  } catch (error) {
    next(error);
  }
};

// Delete audiobook
const deleteAudioBook = async (req, res, next) => {
  try {
    const book = await AudioBook.findByIdAndDelete(req.params.id);
    if (!book) return next(CustomErrorHandler.NotFound("Audio book not found"));

    res.status(200).json({ success: true, message: "Audio book deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllAudioBooks, addAudioBook, deleteAudioBook };
