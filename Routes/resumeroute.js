const express =require('express');
const router = express.Router();
const Resumecotroller = require('../Controllers/Resumecontroller');
const {upload} = require('../utils/multer')
router.post('/addResume', upload.single('resume'), Resumecotroller.CreateResume);
router.get('/getResumes/:userId', Resumecotroller.GetAllResumesByUser);
router.get('/getResumes', Resumecotroller.GetResumeByAdmin);
module.exports=router;
     
    