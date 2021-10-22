const express = require('express');
const verify = require("../middleware/verify");
const router = express.Router();
const Item = require("../models/items");
const User = require('../models/users');
const Request = require('../models/requests');

router.post('/:itemID/:borrowerID/:lenderID', verify, (req,res)=>{
  var {startDate, duration} = req.body;
  const request = new Request({
    itemID: req.params.itemID,
    borrowerID: req.params.borrowerID,
    lenderID: req.params.lenderID,
    startDate: startDate,
    duration: duration,
    status: "Pending"
  });
  request.save(function(err, result){
    if(!err){
      User.findByIdAndUpdate(req.params.borrowerID, {$push: {requested: result.id}}, function(err, docs){
        if(err){
          console.log(err);
        };
      })
      User.findByIdAndUpdate(req.params.lenderID, {$push: {pendingRequests: result.id}}, function(err, docs){
        if(err){
          console.log(err);
        }
      })
    }
  });
  res.redirect('/dashboard/requested/'+req.params.borrowerID);
});

router.get('/approve/:reqID', (req,res)=>{
  Request.findByIdAndUpdate(req.params.reqID, {status: 'Approved'}, function(err, result){
    if(err){
      console.log(err);
    }
    else{
      User.findByIdAndUpdate(result.borrowerID, {$push: {borrowed: result.id}, $pull:{requested: result.id}}, function(err, docs){
        if(err){
          console.log(err);
        };
      });
      User.findByIdAndUpdate(result.lenderID, {$push: {approvedRequests: result.id}, $pull:{pendingRequests: result.id}}, function(err, docs){
        if(err){
          console.log(err);
        };
      });
      Item.findByIdAndUpdate(result.itemID, {$set: {shared: 0}}, function(err,docs){
        if(err){
          console.log(err);
        }
      })
    };
    res.redirect('/dashboard/requests/approved/'+result.lenderID);
  })
});

router.get('/reject/:reqID', (req,res)=>{
  Request.findByIdAndUpdate(req.params.reqID, {$set: {status: 'Rejected'}}, function(err, result){
    if(err){
      console.log(err);
    }
    else{
      User.findByIdAndUpdate(result.lenderID, {$pull:{pendingRequests: result.id}}, function(err, result){
        if(err){
          console.log(err);
        }
      })
      res.redirect('/dashboard/requests/pending/'+result.lenderID);
    }
  })
});

module.exports = router;
