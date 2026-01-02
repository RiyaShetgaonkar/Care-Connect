require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const authRoutes = require("./routes/auth");

const app = express();

/* Middleware */
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/* MongoDB Connection (FIXED) */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected to CareConnect DB"))
  .catch(err => console.error(err));

/* Routes */
app.use("/api/auth", authRoutes);

/* Default route */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

/* Start server */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
