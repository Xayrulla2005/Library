const AudioBook = require("../schema/book.audio.schema");
const CustomErrorHendler = require("../error/custom.error.handlaer");


// GET ALL
const getAllAudioBooks = async (req, res, next) => {
  try {
    const books = await AudioBook.find();
    res.status(200).json(books);
  } catch (err) {
    next(CustomErrorHendler.BadRequest("Failed to retrieve audio books", err));
  }
};


// GET ONE
const getAudioBookById = async (req, res, next) => {
  try {
    const book = await AudioBook.findById(req.params.id);
    if (!book) {
      return next(CustomErrorHendler.NotFound("Audio book not found"));
    }
    res.status(200).json(book);
  } catch (err) {
    next(CustomErrorHendler.BadRequest("Invalid ID format", err));
  }
};


// ADD
const addAudioBook = async (req, res, next) => {
  try {
    const newBook = await AudioBook.create(req.body);
    res.status(201).json({ message: "Audio book added successfully", data: newBook });
  } catch (err) {
    next(CustomErrorHendler.BadRequest("Failed to add audio book", err));
  }
};


// UPDATE
const updateAudioBook = async (req, res, next) => {
  try {
    const updated = await AudioBook.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return next(CustomErrorHendler.NotFound("Audio book not found"));
    }
    res.status(200).json({ message: "Audio book updated successfully", data: updated });
  } catch (err) {
    next(CustomErrorHendler.BadRequest("Failed to update audio book", err));
  }
};


// DELETE
const deleteAudioBook = async (req, res, next) => {
  try {
    const deleted = await AudioBook.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return next(CustomErrorHendler.NotFound("Audio book not found"));
    }
    res.status(200).json({ message: "Audio book deleted successfully" });
  } catch (err) {
    next(CustomErrorHendler.BadRequest("Failed to delete audio book", err));
  }
};


module.exports = {
  getAllAudioBooks,
  getAudioBookById,
  addAudioBook,
  updateAudioBook,
  deleteAudioBook
};
