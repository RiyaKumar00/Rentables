const express = require('express');
const verify = require("../middleware/verify");
const router = express.Router();
const Item = require("../models/items");
const User = require('../models/users');

var fs = require('fs');
var path = require('path');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

router.get('/:userID', verify, (req,res)=>{
  if(req.auth == "valid"){
    res.render("addItem", {userID: req.params.userID});
    return;
  }
  res.render("landingPage");
})

router.post('/:userID', upload.single('thumbnail'), (req,res)=>{
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
      img: {
            data: fs.readFileSync(path.join(__dirname, '../uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
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
