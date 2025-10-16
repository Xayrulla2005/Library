const path = require("path");

// ===================== UPLOAD FILE =====================
const uploadFile = async (req, res, next) => {
  try {
    if (!req.file)
      return res.status(400).json({ success: false, message: "No file uploaded" });

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      fileUrl,
      fileName: req.file.filename,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadFile };
