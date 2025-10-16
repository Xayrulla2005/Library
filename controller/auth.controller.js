const bcrypt = require("bcryptjs");
const User = require("../schema/auth.schema");
const Token = require("../schema/token.schema");
const CustomErrorHandler = require("../error/custom.error.handler");
const { generateTokens } = require("../utils/token");
const nodemailer = require("nodemailer"); 

// Nodemailer config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ===================== REGISTER =====================
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) return next(CustomErrorHandler.badRequest("Email already registered"));

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    const tokens = generateTokens(user);

    // Tokenni saqlash
    await Token.create({ user: user._id, refreshToken: tokens.refreshToken });

    // <<< Nodemailer bilan email jo'natish >>>
    const verificationCode = Math.floor(100000 + Math.random() * 900000); // 6 raqamli
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      text: `Your verification code is: ${verificationCode}`,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully. Verification code sent to email.",
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

    const tokens = generateTokens(user);

    await Token.findOneAndUpdate(
      { userId: user._id },
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
    const user = await User.create({ username, email, password: hashedPassword, role: "admin" });

    res.status(201).json({
      success: true,
      message: "Admin added successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, addAdmin };
