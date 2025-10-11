const { Router } = require("express");
const { upload, uploadFile } = require("../controller/upload.controller");

const UploadRouter = Router();

UploadRouter.post("/upload", upload.single("file"), uploadFile);

module.exports = UploadRouter;
