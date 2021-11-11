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
  shared : Number,
  userID : String,
  img:
  {
      data: Buffer,
      contentType: String
  },
})


module.exports = mongoose.model('Item',ItemSchema);
