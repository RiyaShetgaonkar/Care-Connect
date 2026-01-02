const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

/* ---------- SIGNUP ---------- */
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "There is already an account. Add another account."
      });
    }

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Create user
    const user = await User.create({
      email,
      password: hashedPassword
    });

    // 4️⃣ Send userId for form redirect
    res.json({
      message: "Signup successful",
      userId: user._id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
});

/* ---------- PROFILE FORM ---------- */
router.post("/profile/:id", async (req, res) => {
  try {
    const { name, gender, dob, phone, taluka } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, gender, dob, phone, taluka },
      { new: true }
    );

    res.json({
      message: "Patient details saved successfully",
      patientId: updatedUser.patientId
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving patient details" });
  }
});

module.exports = router;
