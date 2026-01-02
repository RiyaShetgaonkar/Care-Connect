const mongoose = require("mongoose");
const shortid = require("shortid");

const userSchema = new mongoose.Schema({
  patientId: {
    type: String,
    default: () => "CC-" + shortid.generate(),
    unique: true
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  gender: String,
  dob: String,
  phone: String,
  taluka: String
});

module.exports = mongoose.model("User", userSchema);
