require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const  app = express();

app.use(
 cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
 })
);

connectDB();

app.use(express.json());

// Statik Dosyalar
app.use("/backend/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);

// Server başltma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Port ${PORT} de server çalışıyor `));
