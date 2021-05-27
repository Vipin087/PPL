const { promises } = require("fs");
var userDb = require("../schemas/userSchema");

exports.checkUserExist = function checkUserExist(data) {
  return new Promise((resolve, reject) => {
    const Email = data;
    userDb.find({ email: Email }, (err, res) => {
      if (err) {
        reject(err);
      } else {
        
        resolve(res);
      }
    });
  });
}