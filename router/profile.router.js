const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, changePassword } = require("../controller/prfile.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", authMiddleware, getProfile);
router.put("/", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);

module.exports = router;
