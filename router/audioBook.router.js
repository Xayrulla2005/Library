const express = require("express");
const router = express.Router();
const { getAllAudioBooks, addAudioBook, deleteAudioBook } = require("../controller/audioBook.controller");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

router.get("/", getAllAudioBooks);
router.post("/", authMiddleware, adminMiddleware, addAudioBook);
router.delete("/:id", authMiddleware, adminMiddleware, deleteAudioBook);

module.exports = router;
