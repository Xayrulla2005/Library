require("dotenv").config(); 
const multer = require("multer");
const { MongoClient } = require("mongodb");

// Multerni xotirada ishlaydigan qilib sozlaymiz (diskda saqlamaydi)
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uri = process.env.Mongo_URI;
const client = new MongoClient(uri);
const dbName = "library";

const uploadFile = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const files = db.collection("files");

    // Faylni base64 formatga o'tkazamiz
    const base64 = req.file.buffer.toString("base64");

    await files.insertOne({
      filename: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      data: base64,
      uploadedAt: new Date(),
    });

    res.status(201).json({ message: "File uploaded successfully ✅" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { upload, uploadFile };
