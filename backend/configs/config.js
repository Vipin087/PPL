const { TotalLike } = require("../Api/ImageUpload");

module.exports = {
  port: 3001,
  databaseURL: "mongodb://localhost:27017/PPL",
  dataName: [
    "/CheckUserExist",//0
    "/imageData",//1
    "/sendData",//2
    "/SendImageId",//3
    "/TotalLike",//4
    "/CommentData",//5
    "/UpdatePassword",//6
    "/getImage",//7
    "/CheckEmail"
  ],
  email:"vipin.sharma@daffodilsw.com",
  password:"TS4Escanor@"
};
