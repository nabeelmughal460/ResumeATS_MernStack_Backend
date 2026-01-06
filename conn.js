// tasleem123
// Tasleem123
// mongodb+srv://tasleem123:<db_password>@cluster0.ce9ffyd.mongodb.net/?appName=Cluster0
// const{mongoose}=require('mongoose');
// mongoose.connect('mongodb+srv://tasleem123:Tasleem123@cluster0.ce9ffyd.mongodb.net/?appName=Cluster0')
// .then(()=>{
//     console.log("connected to mongodb 💋😀");
// }).catch((err)=>{
//     console.log("error connecting to mongodb", err);
// });

// for vercel deployment i comment this code 
// vercel to run Backend use serverles function

const mongoose = require('mongoose');
// require('dotenv').config();
// import dotenv from 'dotenv';
const dotenv = require('dotenv');
dotenv.config();

let isConnected = false;

async function connectToMongoDB() {
    try {
        if (isConnected) return;

        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("Connected to MongoDB 😀💋");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

module.exports = connectToMongoDB;

//

// add middleware to check connection before each request

