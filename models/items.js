const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
  thumbnail : String,
  name: String,
  category : String,
  description : String,
  cost: String,
  sharedOn: String,
  minTenure: String,
  maxTenure: String,
  rating : String,
  shared : Number,
  userID : String,
})


module.exports = mongoose.model('Item',ItemSchema);
