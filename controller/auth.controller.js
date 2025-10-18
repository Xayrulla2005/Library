const bcrypt = require("bcryptjs");
const User = require("../schema/auth.schema");
const Token = require("../schema/token.schema");
const CustomErrorHandler = require("../error/custom.error.handler");
const { generateTokens } = require("../utils/token");
const sendOtp = require("../utils/send-otp"); // email yuborish

// ===================== REGISTER =====================
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) return next(CustomErrorHandler.badRequest("Email already registered"));

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword, isVerified: false });

    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    user.verificationCode = verificationCode;
    await user.save();

    await sendOtp(email, verificationCode);

    res.status(201).json({
      success: true,
      message: "User registered successfully. Verification code sent to email.",
    });
  } catch (error) {
    next(error);
  }
};

// ===================== VERIFY EMAIL =====================
const verifyEmail = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(CustomErrorHandler.notFound("User not found"));
    if (user.isVerified) return next(CustomErrorHandler.badRequest("Email already verified"));
    if (user.verificationCode != code) return next(CustomErrorHandler.badRequest("Invalid verification code"));

    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    const tokens = generateTokens(user);
    await Token.create({ user: user._id, refreshToken: tokens.refreshToken });

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      ...tokens,
    });
  } catch (error) {
    next(error);
  }
};

// ===================== LOGIN =====================
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(CustomErrorHandler.unauthorized("Invalid email or password"));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(CustomErrorHandler.unauthorized("Invalid email or password"));

    if (!user.isVerified) return next(CustomErrorHandler.unauthorized("Please verify your email first"));

    const tokens = generateTokens(user);
    await Token.findOneAndUpdate(
      { user: user._id },
      { refreshToken: tokens.refreshToken },
      { upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      ...tokens,
    });
  } catch (error) {
    next(error);
  }
};

// ===================== ADD ADMIN =====================
const addAdmin = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) return next(CustomErrorHandler.badRequest("Email already registered"));

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword, role: "admin", isVerified: true });

    res.status(201).json({
      success: true,
      message: "Admin added successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, verifyEmail, login, addAdmin };
