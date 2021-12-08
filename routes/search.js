const express = require('express');
const verify = require("../middleware/verify");
const router = express.Router();
const Item = require("../models/items");
const User = require('../models/users');
const Request = require('../models/requests');

router.post("/",verify,async(req,res)=>{
  try{
    const items = await Item.find({name : {'$regex' : req.body.search , '$options' : 'i'}, shared : 1},(err)=>{
      if(err){
        console.log(err)
      }
    }).clone().sort({id:-1});
    User.findOne({
     emailID: req.data.emailID
    }, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
       if (foundUser) {
         var userID = foundUser.id;
         res.render("search",{item : items , userId : userID});
       } else {
         console.log("User Not Found")
       }
     }
    });
  }
  catch(e){
    res.send(e.message)
  }
})

module.exports = router;
