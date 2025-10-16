const express = require("express");
const router = express.Router();
const {
  getAllAudioBooks,
  getAudioBookById,
  addAudioBook,
  updateAudioBook,
  deleteAudioBook
} = require("../controller/audioBook.controller");

router.get("/", getAllAudioBooks);
router.get("/:id", getAudioBookById);
router.post("/", addAudioBook);
router.put("/:id", updateAudioBook);
router.delete("/:id", deleteAudioBook);

module.exports = router;
