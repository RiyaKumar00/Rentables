const express = require('express');
const verify = require("../middleware/verify");
const router = express.Router();
const Item = require("../models/items");
const User = require('../models/users');

router.get('/:itemID',verify, async(req,res)=>{
  if(req.auth != "valid"){
    res.redirect("/")
    return;
  }
  try{
    Item.findByIdAndRemove(req.params.itemID, function(err, result){
      if(err){
        console.log(err);
      }
      else{
        User.findOne({
         emailID: req.data.emailID
        }, function(err, foundUser) {
          if (err) {
            console.log(err);
          } else {
           if (foundUser) {
             var userID = foundUser.id;
             User.findByIdAndUpdate(userID, {$pull: {shared: req.params.itemID}}, function(err,doc){
               if(err){
                 console.log(err);
               }
             });
             res.redirect('/dashboard/'+userID);
           } else {
             console.log("User Not Found")
           }
         }
        });
      }
    });
  }
  catch(e){
    res.send(e.message)
  }
});

module.exports = router;
