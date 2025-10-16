const express = require("express");
const router = express.Router();
const { register, login, addAdmin } = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const adminCheck = require("../middleware/admin.middleware");

router.post("/register", register);
router.post("/login", login);
router.post("/add-admin", authMiddleware, adminCheck, addAdmin);

module.exports = router;
