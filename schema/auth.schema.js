const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
   default:false,
  },
  otpTime: {
    type: Date,
    default:false,
  },
  role: {
    type: String,
    enum:["user","admin","superadmin"],
    
    default: "user",
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
