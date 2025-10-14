const { Router } = require("express");
const { register, login, addAdmin ,verifay} = require("../controller/auth.controller");
const { validate } = require("../schema/author.schema");
const { registerValidator, loginValidator, verifyValidator } = require("../validator/auth.validator");

const AuthRouter = Router();

AuthRouter.post("/register",validate(registerValidator), register);
AuthRouter.post("/login",validate(loginValidator), login);
AuthRouter.post("/add-admin", addAdmin);
AuthRouter.post("/verify",validate(verifyValidator), verifay);


module.exports = AuthRouter;
