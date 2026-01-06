const express = require('express');
const router = express.Router();
const Usercontroller = require('../Controllers/Ussercontroller');

router.post('/', Usercontroller.RegisterUser);

module.exports = router;






