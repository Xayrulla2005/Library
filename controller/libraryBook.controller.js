const LibraryBook = require("../schema/libraryBook.schema");

// GET ALL
const getBooks = async (req, res, next) => {
  try {
    const books = await LibraryBook.find();
    res.json(books);
  } catch (error) {
    next(error);
  }
};

//ADD BOOK
const addBook = async (req, res, next) => {
  try {
    const { title, author, year, genre } = req.body;
    const book = await LibraryBook.create({ title, author, year, genre });
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

//ADD QUOTE
const addQuote = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { text } = req.body;

    const book = await LibraryBook.findById(bookId);
    if (!book) return res.status(404).json({ message: "Kitob topilmadi" });

    book.quotes.push({ text, addedBy: req.user.id });
    await book.save();

    res.json({ message: "Iqtibos qo‘shildi", book });
  } catch (error) {
    next(error);
  }
};

module.exports = { getBooks, addBook, addQuote };
