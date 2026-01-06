require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectToMongoDB = require('./conn');
const userroute = require('./Routes/userroute');
const resumeroute = require('./Routes/resumeroute');

const app = express();

// 1. DYNAMIC PORT: Railway assigns this. Do not hardcode 8080.
const PORT = process.env.PORT || 8080;

// 2. IMMEDIATE HEALTH CHECK: This stops the SIGTERM/Stopping Container error.
app.get('/health', (req, res) => res.status(200).send('OK'));
app.get('/', (req, res) => res.status(200).send('Server is live!'));

// 3. MIDDLEWARE
app.use(cors({
    origin: [
        "https://resume-ats-mern-stack-frontend.vercel.app", // Your actual URL
        "http://localhost:5173", 
        "http://localhost:3000"
    ], 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());

// 4. DATABASE CONNECTION
connectToMongoDB();

// 5. API ROUTES
app.use('/api/resume', resumeroute);
app.use('/api/user', userroute);

// 6. FRONTEND SERVING (Regex fixed for Express 5)
const buildPath = path.join(__dirname, "build");
app.use(express.static(buildPath));

app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'), (err) => {
        if (err) {
            res.status(200).send("Backend is active. Frontend build folder not found.");
        }
    });
});

// 7. LISTEN ON 0.0.0.0 (Crucial for Railway networking)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server confirmed on port ${PORT}`);
});