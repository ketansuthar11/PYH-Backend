const mongoose = require("mongoose");

// agar local pe .env use karte ho to ye rehne do
require("dotenv").config();

const connectDB = async () => {
  try {
    console.log("MONGO_CONN =>", process.env.MONGO_CONN); // debug ke liye

    await mongoose.connect(process.env.MONGO_CONN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
