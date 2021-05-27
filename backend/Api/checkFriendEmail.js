const { promises } = require("fs");
var userDb = require("../schemas/userSchema");

exports.checkFriendEmail = function checkFriendEmail(data) {
  return new Promise((resolve, reject) => {
    const Email = data;
    userDb.find(
      { email: Email } ,
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
}
exports.addFriend = function addFriend(userEmail,friendEmail) {
  return new Promise((resolve, reject) => {
    userDb.findOne({ email: friendEmail }).then((response) => {
      let result = response.friendRequest.includes(userEmail);
      if (result) {
        ImageDb.updateOne(
          { email: friendEmail },
          { $pullAll: { friendRequest: [userEmail] } }
        ).then(() => {
          ImageDb.findOne({ email: friendEmail }).then((response) => {
            res.send(response);
          });
        });
      } else {
        ImageDb.updateOne(
          { email: friendEmail },
          { $push: { friendRequest: [userEmail] } }
        ).then(() => {
          ImageDb.findOne({ email: friendEmail }).then((response) => {
            res.send(response);
          });
        });
      }
    });
  });
  }