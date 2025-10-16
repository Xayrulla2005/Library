const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const AuthorRouter = require("./router/auth.router");
const BookRouter = require("./router/book.router");
const UploadRouter = require("./router/upload.router");
const AuthRouter = require("./router/auth.router"); 
const LibraryBookRouter = require("./router/libraryBook.router");
const AudioBookRouter = require("./router/audioBook.router");
const PDFBookRouter = require("./router/pdfBook.router");
const ProfileRouter = require("./router/profile.router");
const ForgotRouter = require("./router/forgot.router");



require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB
connectDB();

// Router
app.use("/api/auth", AuthRouter);     
app.use("/api/author", AuthorRouter); 
app.use("/api/book", BookRouter);     
app.use("/api", UploadRouter);
app.use("/api/librarybooks", LibraryBookRouter);
app.use("/api/audiobooks", AudioBookRouter);
app.use("/api/pdfbooks", PDFBookRouter);
app.use("/api/profile", ProfileRouter);
app.use("/api/password", ForgotRouter);


app.listen(PORT, () => {
  console.log(" Server is run at: " + PORT);
});
