// import dotenv from 'dotenv';
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const path = require('path');
 require('./conn');
const userroute = require('./Routes/userroute');
const resumeroute = require('./Routes/resumeroute');

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
// connectToMongoDB();

// Middleware
app.use(cors({
    credentials: true,
    origin: "*" // Allow all origins for now (good for debugging)
}));
app.use(express.json());

// API Routes
app.use('/api/resume', resumeroute);
app.use('/api/user', userroute);

// Health Check Route (Important for Railway!)
// This ensures Railway sees the app as "Healthy" even if the frontend isn't built yet.
app.get('/health', (req, res) => {
    res.status(200).send('Backend is healthy and running!');
});

// -------------------------------------------------------------------------
// FRONTEND SERVING (Fixed for Express 5)
// -------------------------------------------------------------------------

// 1. Serve Static files
app.use(express.static(path.join(__dirname, "build")));

// 2. Catch-All Route (FIXED: '*' changed to regex /(.*)/ for Express 5)
// This handles React routing (e.g., refreshing the page on /dashboard)
app.get(/(.*)/, (req, res) => {
    const indexPath = path.join(__dirname, 'build', 'index.html');
    
    res.sendFile(indexPath, (err) => {
        if (err) {
            // If the build folder is missing, don't crash. 
            // Just say the backend is running.
            res.status(200).send("Backend is running! (React build folder not found)");
        }
    });
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend is running on Port ${PORT} 😀`);
});

module.exports = app;