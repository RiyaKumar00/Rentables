const express = require('express');
const verify = require("../middleware/verify");
const router = express.Router();
const Item = require("../models/items");
const User = require('../models/users');
const Request = require('../models/requests');

router.get('/:itemID', verify, (req,res)=>{
  Item.findByIdAndUpdate(req.params.itemID, {$set: {shared: 1}}, function(err,docs){
    if(err){
      console.log(err);
    }
  });
  User.findOne({
   emailID: req.data.emailID
  }, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
     if (foundUser) {
       var userID = foundUser.id;
       res.redirect('/dashboard/'+userID);
     } else {
       console.log("User Not Found")
     }
   }
  });
});

module.exports = router;
