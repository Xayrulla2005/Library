const bcryptjs = require("bcryptjs");
const User = require("../schema/auth.schema");
const CustomErrorHendler = require("../error/custom.error.handlaer");
const sendOtp = require("../utils/send-otp"); 

/// 1️⃣ FORGOT PASSWORD
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) throw CustomErrorHendler.BadRequest("Email kiritilishi kerak");

    const user = await User.findOne({ email });
    if (!user) throw CustomErrorHendler.NotFound("Bunday foydalanuvchi topilmadi");


    const otp = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");
   
    await sendOtp(email, otp);
    user.otp = otp;
    user.otpTime = Date.now();
    await user.save();

    res.status(200).json({ message: "Emailga tasdiqlash kodi yuborildi" });
  } catch (error) {
    next(error);
  }
};


/// CHECK OTP
const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;

    if (!email || !otp || !newPassword || !confirmPassword) {
      throw CustomErrorHendler.BadRequest("Barcha maydonlar to‘ldirilishi kerak");
    }

    const user = await User.findOne({ email });
    if (!user) throw CustomErrorHendler.NotFound("Foydalanuvchi topilmadi");

    if (user.otp !== otp) {
      throw CustomErrorHendler.BadRequest("OTP noto‘g‘ri kiritildi");
    }

    const diff = Date.now() - user.otpTime;
    if (diff > 5 * 60 * 1000) {
      throw CustomErrorHendler.BadRequest("OTP muddati tugagan, qayta urinib ko‘ring");
    }

    if (newPassword !== confirmPassword) {
      throw CustomErrorHendler.BadRequest("Yangi parol va tasdiqlovchi parol mos emas");
    }

    const hashed = await bcryptjs.hash(newPassword, 12);
    user.password = hashed;
    user.otp = null; 
    user.otpTime = null;
    await user.save();

    res.status(200).json({ message: "Parol muvaffaqiyatli yangilandi" });
  } catch (error) {
    next(error);
  }
};

module.exports = { forgotPassword, resetPassword };
