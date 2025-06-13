const mongoose = require("mongoose");


// ID Card Model
const IdCardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  imagePath: { type: String, },
  createdAt: { type: Date, default: Date.now },
});

const IdCard = mongoose.model("IdCard", IdCardSchema);

module.exports = IdCard;

