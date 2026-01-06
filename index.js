require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectToMongoDB = require('./conn');
const userroute = require('./Routes/userroute');
const resumeroute = require('./Routes/resumeroute');

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectToMongoDB();

// Middleware
app.use(cors({
    origin: "*", // Adjust this to your specific frontend URL for better security later
    credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api/resume', resumeroute);
app.use('/api/user', userroute);

// Serve static files from the React frontend "build" folder
// Note: Ensure the 'build' folder exists in your root directory on Railway
const buildPath = path.join(__dirname, "build");
app.use(express.static(buildPath));

// Handle React routing: Return index.html for any unknown routes
app.get('*', (req, res) => {
    const indexPath = path.join(buildPath, 'index.html');
    
    // Check if the file exists before sending to prevent crashing
    res.sendFile(indexPath, (err) => {
        if (err) {
            // If index.html is missing, send a basic health check response
            res.status(200).send("Backend is running (Frontend build not found)");
        }
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend is running on Port ${PORT} 😀`);
});

module.exports = app;