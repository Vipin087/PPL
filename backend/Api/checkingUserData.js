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
          userDb.updateOne({email:Email},{$set:{showTimeLine:true}},(err,res)=>{
            if(err){"---err",console.log(error)}
            else{"---res",console.log(res)}
          })
          resolve(res);
        }
      }
    );
  })
}
