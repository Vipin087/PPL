const { promises } = require("fs");
var userDb = require("../schemas/userSchema");
module.exports = {
  addUser: function addUser(data) {
    return new Promise((resolve, reject) => {
      userDb.create(data, function (err, result) {

        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
};
