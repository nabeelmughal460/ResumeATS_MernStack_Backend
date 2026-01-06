const mongoose = require('mongoose');

const connectToMongoDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            console.error("❌ MONGODB_URI is missing from environment variables.");
            return;
        }

        await mongoose.connect(uri);
        console.log("✅ Connected to MongoDB 😀💋");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
    }
};

module.exports = connectToMongoDB;