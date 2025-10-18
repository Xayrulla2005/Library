const express = require("express");
const router = express.Router();
const { register, login,verifyEmail, addAdmin } = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const adminCheck = require("../middleware/admin.middleware");

router.post("/register", register);
router.post("/login", login);
router.post("/add-admin", authMiddleware, adminCheck, addAdmin);
router.post("/verify-email", verifyEmail);


module.exports = router;
