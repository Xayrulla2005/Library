const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../schema/auth.schema");


/// REGISTER
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: "student",
    });

    await newUser.save();

    res.status(201).json({
      message: "Registered successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};


/// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const payload = { id: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({
      message: "Success",
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};


/// ADD ADMIN
const addAdmin = async (req, res) => {
  try {
    const { email, role } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      message: "Role updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};


/// EXPORT
module.exports = {
  register,
  login,
  addAdmin,
};
