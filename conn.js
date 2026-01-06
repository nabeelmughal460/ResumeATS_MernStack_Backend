const mongoose = require('mongoose');

// This variable stays in memory to prevent multiple connections
let isConnected = false;

const connectToMongoDB = async () => {
    // If already connected, don't try again
    if (isConnected) {
        console.log("Using existing MongoDB connection");
        return;
    }

    try {
        const dbUri = process.env.MONGODB_URI;

        if (!dbUri) {
            console.error("❌ MONGODB_URI is missing in your environment variables!");
            return;
        }

        // Connect to MongoDB
        await mongoose.connect(dbUri);
        
        isConnected = true;
        console.log("Database Connected Successfully 😀💋");
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err.message);
        // We don't use process.exit(1) here so the backend 
        // can still run even if the DB is temporarily down.
    }
};

module.exports = connectToMongoDB;