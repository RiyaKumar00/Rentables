const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  emailID : String,
  phone: String,
  address: String,
  password : String,
  shared : Array,
  borrowed : Array,
  requested: Array,
  pendingRequests : Array,
  approvedRequests : Array
})


module.exports = mongoose.model('User',UserSchema);
