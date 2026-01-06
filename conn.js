const mongoose = require("mongoose");

let isConnected = false;

async function connectToMongoDB() {
  try {
    if (isConnected) return;

    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error("❌ MONGO_URI missing in environment variables");
      return;
    }

    await mongoose.connect(uri);
    isConnected = true;
    console.log("Connected to MongoDB 😀💋");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
}

module.exports = connectToMongoDB;
