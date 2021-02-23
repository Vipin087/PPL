var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
  imageSchema: { type: String },
  email: { type: String },
  desc: { type: String },
  Tag: { type: String },
  Like: [
    {
      type: String,
    }
  ],
  Comment:[
    {
      type:String
    }
  ]
});
module.exports = mongoose.model("ImageDb", userSchema);
