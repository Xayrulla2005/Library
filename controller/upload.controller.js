require("dotenv").config();
const multer = require("multer");
const { MongoClient } = require("mongodb");


const storage = multer.memoryStorage();
const upload = multer({ storage });


const uri = process.env.Mongo_URI;
const client = new MongoClient(uri);
const dbName = "library";


const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Fayl yuborilmadi!" });
    }

    await client.connect();
    const db = client.db(dbName);
    const files = db.collection("files");

    
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
    res.status(500).json({ message: "Serverda xatolik yuz berdi", error: error.message });
  } finally {
    await client.close(); 
  }
};

module.exports = { upload, uploadFile };
