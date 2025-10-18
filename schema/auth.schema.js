const { Schema, model } = require("mongoose");

const authSchema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    // ✅ Email verification maydonlari
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: Number }, // 6 raqamli kod
  },
  { timestamps: true }
);

module.exports = model("User", authSchema);
