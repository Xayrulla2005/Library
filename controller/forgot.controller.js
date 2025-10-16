const User = require("../schema/auth.schema");
const CustomErrorHandler = require("../error/custom.error.handler");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

// Temporarily OTP'larni saqlash (real loyihada Redis ishlatiladi)
const otpStore = {};

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ===================== SEND OTP =====================
const sendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(CustomErrorHandler.NotFound("Email not found"));

    const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit OTP
    otpStore[email] = otp;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    });

    // OTP 5 daqiqada o‘chadi
    setTimeout(() => delete otpStore[email], 5 * 60 * 1000);

    res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    next(error);
  }
};

// ===================== VERIFY OTP =====================
const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (otpStore[email] != otp)
      return next(CustomErrorHandler.BadRequest("Invalid or expired OTP"));

    const user = await User.findOne({ email });
    if (!user) return next(CustomErrorHandler.NotFound("User not found"));

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    delete otpStore[email];

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendOTP, verifyOTP };
