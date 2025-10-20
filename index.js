const express = require("express");
const path = require("path");
const YAML = require("yamljs");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const errorMiddleware = require("./middleware/error.middlware");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.load(path.join(__dirname, "docs", "documentation.yml"));
const logger = require("./utils/logger"); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Database
connectDB()
  .then(() => logger.info("Database connected successfully"))
  .catch((err) => logger.error(`Database connection error: ${err.message}`));

// Routers
app.use("/api/token", require("./router/token.router"));
app.use("/api/auth", require("./router/auth.router"));
app.use("/api/authors", require("./router/author.router"));
app.use("/api/books", require("./router/book.router"));
app.use("/api/upload", require("./router/upload.router"));
app.use("/api/librarybooks", require("./router/libraryBook.router"));
app.use("/api/audiobooks", require("./router/audioBook.router"));
app.use("/api/pdfbooks", require("./router/pdfBook.router"));
app.use("/api/profile", require("./router/profile.router"));
app.use("/api/password", require("./router/forgot.router"));

// Error handler
app.use(errorMiddleware);


app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
