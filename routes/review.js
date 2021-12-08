const express = require('express');
const verify = require("../middleware/verify");
const router = express.Router();
const Item = require("../models/items");
const User = require('../models/users');
const Request = require('../models/requests');

router.get('/:itemID', verify, (req,res)=>{
  User.findOne({
   emailID: req.data.emailID
  }, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
     if (foundUser) {
       var userID = foundUser.id;
       Item.findById(req.params.itemID, function(err, foundItem){
         if(err){
           res.send(err);
         }
         else{
           res.render("review",{userID : userID, item: foundItem});
         }
       });
     } else {
       console.log("User Not Found")
     }
   }
  });
});

router.post('/:itemID', verify, (req,res)=>{
  var rating = req.body.rating;
  var review = req.body.review;
  var postBy = "Anonymous User";
  if(!req.body.anonymous){
    postBy = req.data.emailID;
  }
  console.log(postBy);
  Item.findByIdAndUpdate(req.params.itemID, {
    $push: {
      reviews: {
        postedBy: postBy,
        rating: rating,
        review: review
      }
    }
  }, function(err){
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
       res.redirect('/view/'+userID+'/'+req.params.itemID);
     } else {
       console.log("User Not Found")
     }
   }
  });
})

module.exports = router;
