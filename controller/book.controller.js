const BookSchema = require("../schema/book.schema");


const getAllBooks = async (req, res) => {
    try {
        const books = await BookSchema.find().populate("author_info");
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const addBook = async (req, res) => {
    try {
        const { title, author, genre, pages, published_year, description, img, author_info } = req.body;

        
        if (!author_info) {
            return res.status(400).json({ message: "author_info (Author ID) is required" });
        }

        await BookSchema.create({ title, author, genre, pages, published_year, description, img, author_info });
        res.status(200).json({ message: "Added new book" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getOneBook = async (req, res) => {
    try {
        const { id } = req.params;
        const foundedBook = await BookSchema.findById(id).populate("author_info");
        if (!foundedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(foundedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, genre, pages, published_year, description, img, author_info } = req.body;

        const foundedBook = await BookSchema.findById(id);
        if (!foundedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        await BookSchema.findByIdAndUpdate(id, { title, author, genre, pages, published_year, description, img, author_info });
        res.status(200).json({ message: "Book updated" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const foundedBook = await BookSchema.findById(id);
        if (!foundedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        await BookSchema.findByIdAndDelete(id);
        res.status(200).json({ message: "Book deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const searchBook = async (req, res) => {
    try {
        const { title } = req.query;
        const results = await BookSchema.find({
            title: { $regex: title, $options: "i" },
        }).populate("author_info");
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBooks,
    addBook,
    getOneBook,
    updateBook,
    deleteBook,
    searchBook,
};
