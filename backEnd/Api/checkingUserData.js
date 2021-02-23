const { promises } = require("fs");
var userDb = require("../schemas/userSchema");

exports.checkExistData = function checkExistData(data) {
  return new Promise((resolve, reject) => {
    const Email = data.email;
    const Password = data.password;
    userDb.find(
      { $and: [{ email: Email }, { password: Password }] },
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
