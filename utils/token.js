const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateTokens = (user) => {
  const payload = {
    user: {
      id: user._id,
      email: user.email,
      role: user.role || "user"
    }
  };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

  return { accessToken, refreshToken };
};

module.exports = { generateTokens };
