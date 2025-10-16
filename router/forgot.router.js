const express = require("express");
const router = express.Router();
const { sendOTP, verifyOTP } = require("../controller/forgot.controller");

router.post("/forgot-password", sendOTP);
router.post("/verify-otp", verifyOTP);

module.exports = router;
