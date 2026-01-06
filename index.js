// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Global error handlers (prevent crash)
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

// MongoDB connection
const connectToMongoDB = require("./conn");

// Create express app
const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectToMongoDB();

// Middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// API routes
const userRoute = require("./Routes/userroute");
const resumeRoute = require("./Routes/resumeroute");

app.use("/api/user", userRoute);
app.use("/api/resume", resumeRoute);

// Health check route (Railway likes this)
app.get("/", (req, res) => {
  res.status(200).send("Backend running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend is running on Port ${PORT} 😀`);
});
