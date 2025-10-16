const express = require("express");
const router = express.Router();
const { getAllPDFBooks, addPDFBook, deletePDFBook } = require("../controller/pdfBook.controller");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

router.get("/", getAllPDFBooks);
router.post("/", authMiddleware, adminMiddleware, addPDFBook);
router.delete("/:id", authMiddleware, adminMiddleware, deletePDFBook);

module.exports = router;
