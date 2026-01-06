require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectToMongoDB = require('./conn');
const userroute = require('./Routes/userroute');
const resumeroute = require('./Routes/resumeroute');

const app = express();

// IMPORTANT: Railway provides the PORT. We must use process.env.PORT.
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectToMongoDB();

// 1. MIDDLEWARE
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());

// 2. RAILWAY HEALTH CHECK (Add this BEFORE other routes)
// This ensures Railway stays connected even if the build folder is missing.
app.get('/', (req, res) => {
    res.status(200).send("Server is live and healthy! 😀");
});

// 3. API ROUTES
app.use('/api/resume', resumeroute);
app.use('/api/user', userroute);

// 4. FRONTEND STATIC FILES (Fixed for Express 5)
const buildPath = path.join(__dirname, "build");
app.use(express.static(buildPath));

// Catch-all for React Routing
app.get(/(.*)/, (req, res) => {
    const indexPath = path.join(buildPath, 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            // If index.html is missing, we already sent the "Live" message above
            // so we just end the request here.
            res.status(200).send("Backend is running (Build folder not found)");
        }
    });
});

// 5. START SERVER (Binding to 0.0.0.0 is required)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend is running on Port ${PORT} 😀`);
});

module.exports = app;