const bcryptjs = require("bcryptjs");
const User = require("../schema/auth.schema");
const CustomErrorHendler = require("../error/custom.error.handlaer");

/// USER PROFILE
const getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password -otp -__v");
    if (!user) {
      throw CustomErrorHendler.NotFound("Foydalanuvchi topilmadi");
    }
    res.status(200).json({ profile: user });
  } catch (error) {
    next(error);
  }
};

/// UPDATE PASSWORD
const updateMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) throw CustomErrorHendler.NotFound("Foydalanuvchi topilmadi");

    const { username, email } = req.body;

    if (username) user.username = username;
    if (email && email !== user.email) {
      const exist = await User.findOne({ email });
      if (exist) throw CustomErrorHendler.AlreadyExist("Bu email allaqachon mavjud");
      user.email = email;
    }

    if (req.file) {
      user.img = `/uploads/${req.file.filename}`;
    }

    await user.save();

    res.status(200).json({
      message: "Profil yangilandi",
      profile: {
        username: user.username,
        email: user.email,
        img: user.img,
      },
    });
  } catch (error) {
    next(error);
  }
};

/// CHANGE PASSWORD
const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      throw CustomErrorHendler.BadRequest("Barcha maydonlar to‘ldirilishi kerak");
    }

    if (newPassword !== confirmPassword) {
      throw CustomErrorHendler.BadRequest("Yangi parol va tasdiqlovchi parol bir xil emas");
    }

    const user = await User.findById(req.user.id);
    if (!user) throw CustomErrorHendler.NotFound("Foydalanuvchi topilmadi");

    const isMatch = await bcryptjs.compare(oldPassword, user.password);
    if (!isMatch) {
      throw CustomErrorHendler.UnAuthorazed("Eski parol noto‘g‘ri");
    }

    const hashed = await bcryptjs.hash(newPassword, 12);
    user.password = hashed;
    await user.save();

    res.status(200).json({ message: "Parol muvaffaqiyatli o‘zgartirildi" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyProfile,
  updateMyProfile,
  changePassword,
};
