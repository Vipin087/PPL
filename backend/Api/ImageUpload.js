var userDb = require("../schemas/userSchema");

var ImageDb = require("../schemas/imageSchema");

module.exports = {
  ImagingUpload: function ImagingUpload(data, data1, data2, data3, data4,data5) {
    return new Promise((resolve, reject) => {
      ImageDb.create(
        {
          imageName: data,
          email: data1,
          desc: data2,
          Tag: data3,
          profilePic:data4,
          fullName:data5
        },
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  ImageGetting: function ImageGetting() {
    return new Promise((resolve, reject) => {
      ImageDb.find({}, function (err, res) {
        resolve(res);
      });
    });
  },
  ImageDataSend: function ImageDataSend(data) {
    return new Promise((resolve, reject) => {
      ImageDb.find({ _id: data }, function (err, res) {
        resolve(res);
      });
    });
  },

  TotalLike: function TotalLike(body) {},
  ProfileUpload: function ProfileUpload(data,data2) {
    return new Promise((resolve, reject) => {
      userDb.updateOne(
        {email:data2},{$set:{
          profileImage: data}
        },
        function (err, result) {
          
          if (err) {
            reject(err);
          } else {
            ImageDb.updateMany({email:data2},{$set:{profilePic:data}},
              function (err, result) {
                
                if (err) {
                  reject(err);
                } else {
                    console.log("ssss",result)
                }})
                console.log("aaaa",result)
            resolve(result);
          }
        }
      );
    });
  }
};
