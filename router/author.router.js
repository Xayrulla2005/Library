const express = require("express");
const router = express.Router();
const { getAllAuthors, addAuthor, updateAuthor, deleteAuthor } = require("../controller/author.controller");
const authMiddleware = require("../middleware/auth.middleware");
const adminCheck = require("../middleware/admin.middleware");

// Public route — everyone can view authors
router.get("/", getAllAuthors);

// Protected routes — only admin
router.post("/", authMiddleware, adminCheck, addAuthor);
router.put("/:id", authMiddleware, adminCheck, updateAuthor);
router.delete("/:id", authMiddleware, adminCheck, deleteAuthor);

module.exports = router;
