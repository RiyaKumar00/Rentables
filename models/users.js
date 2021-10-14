const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  emailID : String,
  phone: String,
  password : String,
  given : Array,
  received : Array,
  pendingApproval : Array,
  requestApproval : Array
})


module.exports = mongoose.model('User',UserSchema);
