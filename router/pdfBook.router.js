const express = require("express");
const router = express.Router();
const {
  getAllPDFBooks,
  getPDFBookById,
  addPDFBook,
  updatePDFBook,
  deletePDFBook
} = require("../controller/pdfBook.controller");


router.get("/", getAllPDFBooks);
router.get("/:id", getPDFBookById);
router.post("/", addPDFBook);
router.put("/:id", updatePDFBook);
router.delete("/:id", deletePDFBook);

module.exports = router;
