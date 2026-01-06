const mongoose = require('mongoose');

let isConnected = false;

const connectToMongoDB = async () => {
    if (isConnected) {
        console.log("Using existing MongoDB connection");
        return;
    }

    try {
        const dbUri = process.env.MONGODB_URI;
        if (!dbUri) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }

        await mongoose.connect(dbUri);
        isConnected = true;
        console.log("Connected to MongoDB 😀💋");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
        // On Railway, you might want to exit if the DB fails
        // process.exit(1); 
    }
};

module.exports = connectToMongoDB;