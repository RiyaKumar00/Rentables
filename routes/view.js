const express = require('express');
const verify = require("../middleware/verify");
const router = express.Router();
const Item = require("../models/items");
const User = require('../models/users');

router.get('/:userID/:itemID', verify, (req,res)=>{
  if(req.auth == "valid"){
    try{
      Item.findById(req.params.itemID, function(err, foundItem) {
        if (err) {
          console.log(err);
          res.redirect("/home");
        } else {
         if (foundItem) {
           User.findById(foundItem.userID, function(err, foundUser) {
             if (err) {
               console.log(err);
               res.redirect("/home");
             } else {
              if (foundUser) {
                var userID = foundUser.id;
                console.log(userID);
                res.render("itemDetails",{item: foundItem, user: foundUser, userID: req.params.userID});
              } else {
                var user = {
                  name: "No one"
                }
                console.log("User Not Found");
                  res.render("itemDetails",{item: foundItem, user: user});
              }
            }
           });
         } else {
           console.log("Item Not Found");
           res.redirect("/home");
         }
       }
      });
    }
    catch(e){
      console.log(e.message);
    }
  }
  else{
    res.render("landingPage");
  }
});

module.exports = router;
