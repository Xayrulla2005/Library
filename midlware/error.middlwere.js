const CustomErrorHendler = require("../error/custom.error.handlaer");

module.exports = function (err, req, res, next) {
    if (err instanceof CustomErrorHendler) {
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors
        });
    }

    return res.status(500).json({
        message: "Servers error!",
        error: err.message
    });
};
