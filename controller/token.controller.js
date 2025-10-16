const jwt = require("jsonwebtoken");
const Token = require("../schema/token.schema");
const { generateTokens } = require("../utils/token");
const CustomErrorHandler = require("../error/custom.error.handler");

// ===================== REFRESH TOKEN =====================
const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return next(CustomErrorHandler.BadRequest("No token provided"));

  
    const storedToken = await Token.findOne({ refreshToken });
    if (!storedToken) return next(CustomErrorHandler.Unauthorized("Invalid refresh token"));

  
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const tokens = generateTokens({ _id: decoded.id, role: decoded.role });

    storedToken.refreshToken = tokens.refreshToken;
    await storedToken.save();

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      ...tokens,
    });
  } catch (error) {
    next(error);
  }
};

// ===================== LOGOUT =====================
const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return next(CustomErrorHandler.BadRequest("No token provided"));

    await Token.findOneAndDelete({ refreshToken });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { refresh, logout };
