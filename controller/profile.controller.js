const User = require("../schema/auth.schema");
const CustomErrorHandler = require("../error/custom.error.handler");
const bcrypt = require("bcryptjs");

// ===================== GET PROFILE =====================
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return next(CustomErrorHandler.NotFound("User not found"));

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// ===================== UPDATE PROFILE =====================
const updateProfile = async (req, res, next) => {
  try {
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) return next(CustomErrorHandler.NotFound("User not found"));

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// ===================== CHANGE PASSWORD =====================
const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return next(CustomErrorHandler.NotFound("User not found"));

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return next(CustomErrorHandler.BadRequest("Old password is incorrect"));

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile, changePassword };
