// const {resumeModel} = require("../Models/Resume");
const resumeModel = require("../Models/Resume");
const mongoose = require("mongoose");
const pdfParse = require("pdf-parse");
const { CohereClient } = require("cohere-ai");
const fs = require('fs');
// import dotenv from 'dotenv';
const dotenv = require('dotenv');
  dotenv.config();

const cohere = new CohereClient({
  // token: "CeJ3TCxMRJ1sbToZrJj3MhAQXgOfMTsWnVKDGOMd" 
  token: process.env.COHERE_API_KEY
});

exports.CreateResume = async (req, res) => {
  try {
    const { job_Desc, userId } = req.body;

    // if (!req.file) {
    //   return res.status(400).json({ message: "No PDF file uploaded." });
    // }

    // const pdfpath = req.file.path;
    // const dataBuffer = fs.readFileSync(pdfpath);
    // const pdfData = await pdfParse(dataBuffer);
    const pdfbuffer=req.file.buffer || null;
    const pdfpath=req.file.path;
    const fs=require('fs');
    const dataBuffer=fs.readFileSync(pdfpath);
    const pdfData=await pdfParse(dataBuffer);
    // console.log("PDF text extracted:", pdfData); // Log first 100 chars

    // 1. Updated Prompt: More direct to ensure the AI uses the keywords "Score:" and "Reason:"
    const message = `
      Task: Resume Screening Assistant
      Analyze the Resume against the Job Description.
      
      Output ONLY in this exact format:
      Score: [0-100]
      Reason: [Concise feedback]

      Resume:
      ${pdfData.text}

      Job Description:
      ${job_Desc}
    `;

    // 2. Updated Model ID: Using the 2024-08 long-term support version
    const response = await cohere.chat({
      model: "command-r-08-2024", 
      message: message,
      temperature: 0.2, 
    });

    let result = response.text;
    console.log("Raw Response:", result);

    // 3. Robust Regex: Using 'i' flag (case-insensitive) and 'm' (multiline)
    const scoreMatch = result.match(/Score:\s*(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0; 

    const reasonMatch = result.match(/Reason:\s*([\s\S]*)/i);
    const reason = reasonMatch ? reasonMatch[1].trim() : "Analysis complete.";

    // 4. Save to DB
    const newResume = new resumeModel({
      userId,
      resumeName: req.file.originalname,
      job_Desc,
      score: score,
      feedback: reason
    });
      console.log("New Resume Document:", newResume);
    await newResume.save();
    
    if (fs.existsSync(pdfpath)) {
       fs.unlinkSync(pdfpath);
    }

    res.status(201).json({
      message: "Resume analyzed and saved successfully",
      data: newResume
    });

  } catch (error) {
    console.error("Cohere API Error:", error);
    return res.status(error.statusCode || 500).json({
      message: error.message,
      details: "Check model availability in Cohere Dashboard"
    });
  }
};


exports.GetAllResumesByUser = async (req, res) => {
  try {
    const { user } = req.params;
    let resumes = await resumeModel.find({ user: user }).sort({ createdAt: -1 });
    console.log(resumes,'heddsjdklsjdsakldjsadjsdhgfghjfjhjhfjhklfjhjityoipyo');
    return res.status(200).json({message:"Your Previous History", resumes: resumes });
  }
  catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}


exports.GetResumeByAdmin = async (req, res) => {
  try {

    let resumes = await resumeModel.find({}).sort({ createdAt: -1 }).populate('userId');
    console.log(resumes);
    return res.status(200).json({message:"Fethched All History", resumes: resumes });

  }
  catch (error) {  
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}