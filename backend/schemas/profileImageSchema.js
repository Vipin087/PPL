var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
  imageName: { type: String }
});
module.exports = mongoose.model("ProfileImageDb", userSchema);
