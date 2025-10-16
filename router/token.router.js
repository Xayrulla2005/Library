const express = require("express");
const router = express.Router();
const { refresh, logout } = require("../controller/token.controller");

// Refresh access token
router.post("/refresh", refresh);

// Logout user
router.post("/logout", logout);

module.exports = router;
