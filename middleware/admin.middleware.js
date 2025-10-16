const CustomErrorHandler = require("../error/custom.error.handler");

const adminCheck = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(CustomErrorHandler.forbidden("Admin access required"));
  }
  next();
};

module.exports = adminCheck;
