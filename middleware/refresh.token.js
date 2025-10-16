const jwt = require("jsonwebtoken");
const User = require("../schema/auth.schema");
const CustomErrorHandler = require("../error/custom.error.handlaer");

const refreshToken = async (req, res, next) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      throw CustomErrorHandler.BadRequest("Refresh token topilmadi");
    }

    // CHECK TOKEN
    jwt.verify(refresh_token, process.env.REFRESH_SECRET, async (err, decoded) => {
      if (err) {
        throw CustomErrorHandler.UnAuthorazed("Refresh token yaroqsiz yoki muddati tugagan");
      }

      const user = await User.findById(decoded.id);
      if (!user) {
        throw CustomErrorHandler.NotFound("Foydalanuvchi topilmadi");
      }

      //NEW TOKEN
      const payload = { id: user._id, email: user.email, role: user.role };
      const newAccessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });

      res.status(200).json({
        message: "Access token yangilandi",
        access_token: newAccessToken,
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = refreshToken;
