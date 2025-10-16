const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middware");
const { uploadFile } = require("../controller/upload.controller");
const authMiddleware = require("../middleware/auth.middleware");


router.post("/", authMiddleware, upload.single("file"), uploadFile);

module.exports = router;
