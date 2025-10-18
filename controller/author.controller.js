const Author = require("../schema/author.schema");
const CustomErrorHandler = require("../error/custom.error.handler");
const { authorValidator } = require("../validator/author.validator");


const validateAuthor = (body, next) => {
    const { error } = authorValidator(body);
    if (error) throw CustomErrorHandler.BadRequest(error.details[0].message);
};

const getAllAuthors = async (req, res, next) => {
    try {
        const authors = await Author.find().sort("-createdAt");
        res.json({ success: true, count: authors.length, data: authors });
    } catch (err) {
        next(err);
    }
};

const addAuthor = async (req, res, next) => {
    try {
        validateAuthor(req.body);
        const author = await Author.create(req.body);
        res.status(201).json({ success: true, message: "Author added", data: author });
    } catch (err) {
        next(err);
    }
};

const updateAuthor = async (req, res, next) => {
    try {
        validateAuthor(req.body);
        const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!author) throw CustomErrorHandler.NotFound("Author not found");
        res.json({ success: true, message: "Author updated", data: author });
    } catch (err) {
        next(err);
    }
};


const deleteAuthor = async (req, res, next) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        if (!author) throw CustomErrorHandler.NotFound("Author not found");
        res.json({ success: true, message: "Author deleted" });
    } catch (err) {
        next(err);
    }
};

module.exports = { getAllAuthors, addAuthor, updateAuthor, deleteAuthor };
