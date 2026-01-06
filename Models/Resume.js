const mongoose = require('mongoose');
const resumeSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    resumeName: {
        type: String,
        required: true,
    },
    job_Desc:{
        type: String,
        required: true,
    },
    score:{
        type: String,
    },
    feedback:{
        type: String,
    },},{timestamps:true})
// const resumeModel = mongoose.model('Resume', resumeSchema);
// module.exports = { resumeModel };
// const Resume = mongoose.model('Resume', resumeSchema);
// module.exports = { resumeModel: Resume };
module.exports = mongoose.model('Resume', resumeSchema);