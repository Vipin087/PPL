const { promises } = require("fs");
var userDb = require("../schemas/userSchema");

exports.checkEmailData = function checkEmailData(data) {
  return new Promise((resolve, reject) => {
    const Email = data;
    userDb.find(
      { email: Email } ,
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          console.log("my res is",res)
          resolve(res);
        }
      }
    );
  });
}
