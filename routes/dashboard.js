const express = require('express');
const verify = require("../middleware/verify");
const router = express.Router();
const Item = require("../models/items");
const User = require('../models/users');

router.get('/:userID', verify, (req,res)=>{
  if(req.auth == "valid"){
    User.findById(req.params.userID, async function(err, foundUser) {
      if (err) {
        console.log(err);
        res.redirect("/home");
      } else {
       if (foundUser) {
         var shared = foundUser.shared;
         var items = [];
         for(let i=0;i<shared.length;i++){
           var item = await Item.findById(shared[i]);
           items.push(item);
         }
         res.render("Dashboard",{user: foundUser, item: items});
       } else {
         console.log("User Not Found");
         res.redirect("/home");
       }
     }
    });
  }
  else{
    res.render("landingPage");
  }
});

router.get('/borrowed/:userID', verify, (req,res)=>{
  if(req.auth == "valid"){
    User.findById(req.params.userID, async function(err, foundUser) {
      if (err) {
        console.log(err);
        res.redirect("/home");
      } else {
       if (foundUser) {
         var borrowed = foundUser.borrowed;
         var items = [];
         for(let i=0;i<borrowed.length;i++){
           var item = await Item.findById(borrowed[i]);
           items.push(item);
         }
         res.render("borrowedDashboard",{user: foundUser, item: items});
       } else {
         console.log("User Not Found");
         res.redirect("/home");
       }
     }
    });
  }
  else{
    res.render("landingPage");
  }
});

router.get('/requested/:userID', verify, (req,res)=>{
  if(req.auth == "valid"){
    User.findById(req.params.userID, async function(err, foundUser) {
      if (err) {
        console.log(err);
        res.redirect("/home");
      } else {
       if (foundUser) {
         var requested = foundUser.requested;
         var items = [];
         for(let i=0;i<requested.length;i++){
           var item = await Item.findById(requested[i]);
           items.push(item);
         }
         res.render("requestedDashboard",{user: foundUser, item: items});
       } else {
         console.log("User Not Found");
         res.redirect("/home");
       }
     }
    });
  }
  else{
    res.render("landingPage");
  }
});

router.get('/requests/pending/:userID', verify, (req,res)=>{
  if(req.auth == "valid"){
    User.findById(req.params.userID, async function(err, foundUser) {
      if (err) {
        console.log(err);
        res.redirect("/home");
      } else {
       if (foundUser) {
         var pendingRequests = foundUser.pendingRequests;
         var items = [];
         for(let i=0;i<pendingRequests.length;i++){
           var item = await Item.findById(pendingRequests[i]);
           items.push(item);
         }
         res.render("pendingDashboard",{user: foundUser, item: items});
       } else {
         console.log("User Not Found");
         res.redirect("/home");
       }
     }
    });
  }
  else{
    res.render("landingPage");
  }
});

router.get('/requests/approved/:userID', verify, (req,res)=>{
  if(req.auth == "valid"){
    User.findById(req.params.userID, async function(err, foundUser) {
      if (err) {
        console.log(err);
        res.redirect("/home");
      } else {
       if (foundUser) {
         var approvedRequests = foundUser.approvedRequests;
         var items = [];
         for(let i=0;i<approvedRequests.length;i++){
           var item = await Item.findById(approvedRequests[i]);
           items.push(item);
         }
         res.render("approvedDashboard",{user: foundUser, item: items});
       } else {
         console.log("User Not Found");
         res.redirect("/home");
       }
     }
    });
  }
  else{
    res.render("landingPage");
  }
});

module.exports = router;
