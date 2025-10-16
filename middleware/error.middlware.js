const CustomErrorHandler = require("../error/custom.error.handler");

module.exports = function (err, req, res, next) {
  const statusCode = err instanceof CustomErrorHandler ? err.statusCode : 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Server error!",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
};
