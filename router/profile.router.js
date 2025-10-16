const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload"); // agar rasm yuklash bo‘lsa
const { getMyProfile, updateMyProfile, changePassword } = require("../controller/profile.controller");

router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, upload.single("img"), updateMyProfile);
router.put("/change-password", authMiddleware, changePassword);

module.exports = router;
