const express = require('express');
const verify = require("../middleware/verify");
const router = express.Router();
const Item = require("../models/items");
const User = require('../models/users');
const Request = require('../models/requests');

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
           var request = await Request.findById(borrowed[i]);
           var item = await Item.findById(request.itemID);
           items.push({object: item, req: request});
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
           var request = await Request.findById(requested[i]);
           var item = await Item.findById(request.itemID);
           items.push({object: item, req: request});
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
           var request = await Request.findById(pendingRequests[i]);
           var item = await Item.findById(request.itemID);
           items.push({object: item, req: request});
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
           var request = await Request.findById(approvedRequests[i]);
           var item = await Item.findById(request.itemID);
           items.push({object: item, req: request});
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
