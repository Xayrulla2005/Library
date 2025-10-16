const Author = require("../schema/author.schema");
const CustomErrorHandler = require("../error/custom.error.handler");
const { authorValidator } = require("../validator/author.validator");

// ===================== GET ALL AUTHORS =====================
const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: authors.length,
      data: authors,
    });
  } catch (error) {
    next(error);
  }
};

// ===================== ADD AUTHOR (ADMIN ONLY) =====================
const addAuthor = async (req, res, next) => {
  try {
    const { error } = authorValidator(req.body);
    if (error) return next(CustomErrorHandler.BadRequest(error.details[0].message));

    const author = await Author.create(req.body);

    res.status(201).json({
      success: true,
      message: "Author added successfully",
      data: author,
    });
  } catch (error) {
    next(error);
  }
};

// ===================== UPDATE AUTHOR (ADMIN ONLY) =====================
const updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = authorValidator(req.body);
    if (error) return next(CustomErrorHandler.BadRequest(error.details[0].message));

    const updated = await Author.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) return next(CustomErrorHandler.NotFound("Author not found"));

    res.status(200).json({
      success: true,
      message: "Author updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// ===================== DELETE AUTHOR (ADMIN ONLY) =====================
const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const author = await Author.findByIdAndDelete(id);
    if (!author) return next(CustomErrorHandler.NotFound("Author not found"));

    res.status(200).json({
      success: true,
      message: "Author deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllAuthors, addAuthor, updateAuthor, deleteAuthor };
