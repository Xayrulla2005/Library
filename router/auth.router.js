const { Router } = require("express");
const { register, login, addAdmin } = require("../controller/auth.controller");

const AuthRouter = Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.post("/add-admin", addAdmin);

module.exports = AuthRouter;
