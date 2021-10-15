const express = require('express');
const router = express.Router();
const bycrypt = require("bcryptjs");
const User = require('../models/users')
const verify = require("../middleware/verify")

router.get("/", (req,res)=>{
  res.render("register");
})

router.post("/", async(req,res)=>{
  try{
    var {name, emailID, phone, password, address} = req.body;
    const salt = await bycrypt.genSalt(10);
    password = await bycrypt.hash(password,salt);
    const user = new User({
      name: name,
      emailID : emailID,
      phone: phone,
      address: address,
      password : password,
      shared : [],
      borrowed : [],
      requested: [],
      pendingRequests : [],
      approvedRequests : []
    })
    user.save();
    console.log("Successfully Registered!");
    res.redirect("/")
  }
  catch(e){
    console.log(e.message);
    res.send(e.message);
  }
})

module.exports = router;
