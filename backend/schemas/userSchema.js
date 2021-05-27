var mongoose = require("mongoose");
const profileImageSchema = require("./profileImageSchema");
var userSchema = mongoose.Schema({
  Uname: { type: String },
  password: { type: String },
  email: { type: String },
  Fname: { type: String },
  Lname: { type: String },
  profileImage: { type: String, default: "timeline_img1.png" },
  Sex: { type: String, default: "Male" },
  profileDesc: {
    type: String,
    default:"Enter Your Description"
  },
  pendingFriendRequest: [
    {
      type: String,
    },
  ],
  friends: [
    {
      type: String,
    },
  ],sendFriendRequest: [
    {
      type: String,
    },
  ]
});
module.exports = mongoose.model("userdb", userSchema);
