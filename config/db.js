const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.Mongo_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("DB connection error:", error.message);
  }
}

module.exports = connectDB;
