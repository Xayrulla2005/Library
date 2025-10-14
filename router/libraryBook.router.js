const express = require("express");
const router = express.Router();
const { getBooks, addBook, addQuote } = require("../controller/libraryBook.controller");
const { addBookValidator, addQuoteValidator } = require("../validator/libraryBook.validator");
const authMiddleware = require("../midlware/auth.midlware");
const validate = require("../midlware/validate.midlware");

router.get("/", getBooks);
router.post("/", authMiddleware, validate(addBookValidator), addBook);
router.post("/:bookId/quote", authMiddleware, validate(addQuoteValidator), addQuote);

module.exports = router;
