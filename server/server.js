require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDb = require("./config/connectDb");
const { createIdCard, viewIdCard } = require("./controllers/idcard.controller");
const { register, login, logout, checkAuth } = require("./controllers/user.controller");
const requireAuth = require("./middleware/requireAuth");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

connectDb();
// Image upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes

app.get("/check-auth", requireAuth, checkAuth);

app.post("/api/idcards", upload.single("image"), createIdCard);

app.get("/api/idcards", viewIdCard);

// register user
app.post("/register", register);

app.post("/login", login);

app.get("/logout", logout);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});