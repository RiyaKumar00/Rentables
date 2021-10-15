const express = require('express');
const verify = require("../middleware/verify");
const router = express.Router();
const Item = require("../models/items");
const User = require('../models/users');

router.get('/:userID', verify, (req,res)=>{
  if(req.auth == "valid"){
    res.render("addItem", {userID: req.params.userID});
    return;
  }
  res.render("landingPage");
})

router.post('/:userID', verify, (req,res)=>{
  try{
    var {name, category, cost, minTenure, maxTenure, description} = req.body;
    const item = new Item({
      name: name,
      category : category,
      description : description,
      cost: cost,
      sharedOn: String,
      minTenure: minTenure,
      maxTenure: maxTenure,
      shared : 1,
      userID : req.params.userID,
    });
    var d = new Date();
    item.sharedOn = d;
    item.save(function(err, result){
      if(err){
        console.log(err);
      }
      else{
        console.log(result.id);
        User.findByIdAndUpdate(req.params.userID, {$push:{shared: result.id}}, function(err, docs){
          if(err){
            console.log(err);
          }
          else{
            console.log(docs);
          }
        })
      }
    });

    console.log("Successfully Saved!");
  }
  catch(e){
    console.log(e.message);
  }
  res.redirect("/dashboard/"+req.params.userID);
})

module.exports = router;
