const mongoose = require("mongoose");

// user model
const userSchema = new mongoose.Schema({
  user: { type: String, unique: true, required: true },
  pass: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;