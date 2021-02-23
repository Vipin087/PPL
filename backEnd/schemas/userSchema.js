var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
  Uname: { type: String },
  password: { type: String },
  email: { type: String },
  Fname: { type: String },
  Lname: { type: String }
  
});
module.exports = mongoose.model("userdb", userSchema);
