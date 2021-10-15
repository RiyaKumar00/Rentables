const express = require('express');
const verify = require("../middleware/verify");
const router = express.Router();
const Item = require("../models/items");
const User = require('../models/users');

router.get("/",verify,async(req,res)=>{
  if(req.auth != "valid"){
    res.redirect("/")
    return;
  }
  try{
    let items = await Item.find({shared : 1}).sort({_id : -1});
    User.findOne({
     emailID: req.data.emailID
    }, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
       if (foundUser) {
         var userID = foundUser.id;
         res.render("home",{item : items , userId : userID});
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
