const mongoose = require("mongoose");

// Database connection
const connectDb = () => {
  mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/id-card-generator"
  );
};

module.exports = connectDb;
