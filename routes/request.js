const express = require('express');
const verify = require("../middleware/verify");
const router = express.Router();
const Item = require("../models/items");
const User = require('../models/users');

router.get('/:borrowerID/:lenderID', verify, (req,res)=>{

});

module.exports = router;
