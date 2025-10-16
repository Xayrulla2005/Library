const express = require("express");
const router = express.Router();
const { getAllLibraryBooks, addLibraryBook, deleteLibraryBook } = require("../controller/libraryBook.controller");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

router.get("/", getAllLibraryBooks);
router.post("/", authMiddleware, adminMiddleware, addLibraryBook);
router.delete("/:id", authMiddleware, adminMiddleware, deleteLibraryBook);

module.exports = router;
