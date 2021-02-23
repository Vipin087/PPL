const { promises } = require("fs");
var userDb = require("../schemas/userSchema");
module.exports = {
  addUser: function addUser(data) {
    console.log("addUser",data)
    return new Promise((resolve, reject) => {
      userDb.create(data, function (err, result) {
        // console.log("inside",data)
        if (err) {
          reject(err);
        } else {
          console.log("user data inserted", data);
          resolve(result);
        }
      });
    });
  }
};
