const express = require('express');
const verify = require("../middleware/verify");
const router = express.Router();
const Item = require("../models/items");
const User = require('../models/users');

router.get('/', verify, (req,res)=>{
  if(req.auth == "valid"){
    res.clearCookie("token");
    res.redirect("/");
    return;
  }
  res.render("landingPage");
});

module.exports = router;
