const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../schema/auth.schema");
const CustomErrorHendler = require("../error/custom.error.handlaer");
const sendOtp = require("../utils/send-otp");

/// REGISTER
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const foundeduser = await User.findOne({ email });
    if (foundeduser) {
      throw CustomErrorHendler.AlreadyExist("Bu email avval ro'yxatdan o'tgan!");
    }

    const hashedPassword = await bcryptjs.hash(password, 12);

    
    const randumNum = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');

    sendOtp(email, randumNum);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      otp: randumNum,
      otpTime: Date.now(),
    });

    await newUser.save();

    res.status(201).json({
      message: "Registered successfully, check your email for OTP",
    });
  } catch (error) {
    next(error);
  }
};

/// LOGIN
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw CustomErrorHendler.NotFound("User not found");
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      throw CustomErrorHendler.UnAuthorazed("Invalid password");
    }

    const payload = { id: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({
      message: "Success",
      token,
    });
  } catch (error) {
    next(error);
  }
};

/// VERIFY OTP
const verifay = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw CustomErrorHendler.NotFound("User not found");
    }

    if (user.otp !== otp) {
      throw CustomErrorHendler.BadRequest("OTP xato kiritildi");
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();

    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    next(error);
  }
};

/// ADD ADMIN
const addAdmin = async (req, res, next) => {
  try {
    const { email, role } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw CustomErrorHendler.NotFound("User not found");
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      message: "Role updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/// EXPORT
module.exports = {
  register,
  login,
  addAdmin,
  verifay
};
