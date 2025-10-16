const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} = require("../controller/book.controller");
const authMiddleware = require("../middleware/auth.middleware");
const adminCheck = require("../middleware/admin.middleware");

// Public routes
router.get("/", getAllBooks);
router.get("/:id", getBookById);

// Admin-only routes
router.post("/", authMiddleware, adminCheck, addBook);
router.put("/:id", authMiddleware, adminCheck, updateBook);
router.delete("/:id", authMiddleware, adminCheck, deleteBook);

module.exports = router;
