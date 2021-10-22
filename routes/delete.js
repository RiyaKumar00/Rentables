const express = require('express');
const verify = require("../middleware/verify");
const router = express.Router();
const Item = require("../models/items");
const User = require('../models/users');
const Request = require('../models/requests');

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

router.get('/request/:reqID',verify, async(req,res)=>{
  if(req.auth != "valid"){
    res.redirect("/")
    return;
  }
  try{
    Request.findByIdAndRemove(req.params.reqID, (err, result)=>{
      if(err){
        console.log(err);
      }
      else{
        User.findByIdAndUpdate(result.borrowerID, {$pull: {requested: result.id}}, (err, doc)=>{
          if(err){
            console.log(err);
          }
        });
        User.findByIdAndUpdate(result.lenderID, {$pull: {pendingRequests: result.id}}, (err, doc)=>{
          if(err){
            console.log(err);
          }
        });
        res.redirect('/dashboard/requested/'+result.borrowerID);
      }
    });
  }
  catch(e){
    console.log(e.message);
  }
});

module.exports = router;
