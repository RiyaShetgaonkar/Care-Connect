require("dotenv").config();
const express = require("express");
const path = require("path");
const admin = require("firebase-admin");

// 1. INITIALIZE FIREBASE FIRST
const serviceAccount = require("./firebaseServiceKey.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log("🔥 Firebase Admin Initialized");
}

// 2. REQUIRE ROUTES
const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());

// 3. API ROUTES (Move this ABOVE Static Files)
// This ensures /api/auth calls go to your code, not a file
app.use("/api/auth", authRoutes);

// 4. STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// 5. DEFAULT ROUTE
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
