var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
  imageName: { type: String },
  email:{type:String},
  fullName: { type: String },
  desc: { type: String },
  Tag: { type: String },
  profilePic:{type: String},
  Like: [
    {
      type: String,
    },
  ],
  Comment: [
    {
      type: String,
    },
  ],
});
module.exports = mongoose.model("ImageDb", userSchema);
