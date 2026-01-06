// import dotenv from 'dotenv';
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const path =require('path');
// ('dotenv').config();

// require('./conn');
const connectToMongoDB = require('./conn');
const userroute= require('./Routes/userroute');
const resumeroute= require('./Routes/resumeroute');
// app.get('/', (req, res) => {
//   res.send({message: 'Hello from backend 😎'});
// });

const app = express();
const PORT = process.env.PORT || 4000;
//connect to mongodb
connectToMongoDB();
app.use(cors({
    credentials: true,
    // origin: 'http://localhost:5173',//or local server
    origin:"*" //for vercel deployment

}));
app.use(express.json()); 
app.use('/api/resume',resumeroute);  
app.use('/api/user',userroute);
 
app.get("/", (req, res) => {
  res.status(200).send("Backend running 🚀");
});
app.listen(PORT,()=>{
    console.log("backend is running on Port 😀");
    
}) //for local server


module.exports=app;

