const { promises, readSync } = require("fs");
const { request } = require("http");
const { resolve } = require("path");
const router = require("../router/router");
var ImageDb = require("../schemas/imageSchema");
module.exports = {
  ImagingUpload: function ImagingUpload(data, data1, data2, data3, data4) {
    // console.log("addUser")
    return new Promise((resolve, reject) => {
      ImageDb.create(
        {
          imageSchema: data,
          email: data1,
          desc: data2,
          Tag: data3,
        },
        function (err, result) {
          // console.log("inside",data)
          if (err) {
            reject(err);
          } else {
            // console.log("Image inserted", data);
            resolve(result);
          }
        }
      );
    });
  },
  ImageGetting: function ImageGetting() {
    return new Promise((resolve, reject) => {
      ImageDb.find({}, function (err, res) {
        // console.log(res);
        resolve(res);
      });
    });
  },
  ImageDataSend: function ImageDataSend(data){
    return new Promise((resolve,reject)=>{
      ImageDb.find({_id:data},function(err,res){
        // console.log("response is(ID):",res)
        resolve(res)
      })
    })
  },

TotalLike: function TotalLike(body){
 
   
  }
  // return new Promise((resolve,reject)=>{
  //   ImageDb.find({ UserId:[data2]  },(err, res) => {
  //   if (err) {
  //     reject(err);
  //     console.log("a")
  //   } else {
  //     resolve(res);
  //     console.log("a111",res)
  //   }
  // });

  // ImageDb.updateOne({_id:data1},{$push:{UserId:[data2]}},{$ne:{UserId:[data2]}},(err, res) => {
  //   if (err) {
  //     reject(err);
  //     console.log("a11")
  //   } else {
  //     console.log("POIUYTRRR")
  //     ImageDb.find({_id:data1}) ,(err,res)=>{
  //     if(err){console.log("ssasa")
  //     reject(err)}
  //     else{resolve(res)
  //     console.log("dadsadadsd",res)}
  //   }  
    
    
  //   }
  // });
  // }
  // )}

};