const mongoose = require('mongoose');

const RequestSchema = mongoose.Schema({
  itemID: String,
  borrowerID: String,
  lenderID: String,
  startDate: String,
  duration: String,
  status: String
})


module.exports = mongoose.model('Request',RequestSchema);
