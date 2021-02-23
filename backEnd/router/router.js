var express = require("express");
var router = express.Router();
var addUsers = require("../Api/addUser");
var checkingUserData = require("../Api/checkingUserData");
var checkUserExists = require("../Api/checkUserExist");
var place = require("../configs/config");
var multer = require("multer");
var ImageUploads = require("../Api/ImageUpload");
var bodyParser = require("body-parser");
var app = express();
var ImageDb = require("../schemas/imageSchema");
var checkForgotPasswordEmail=require("../Api/checkForgotPasswordEmail")
var  nodemailer = require('nodemailer') ;
var UserDb =require("../schemas/userSchema")
var Address=require("../configs/config")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var storage = multer.diskStorage({
  destination: "./images",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });
router.post(place.dataName[0], async (req, res) => {
  let checkExistData = await checkingUserData.checkExistData(req.body);
  if (checkExistData.length > 0) {
    console.log("u are logged in ");
    res.send(true);
  } else {
    console.log("wrong id or pswrd");
    res.send(false);
  }
});

router.post(place.dataName[2], async (req, res) => {
  console.log("get call", req.body);

  let checkUserExist = await checkUserExists.checkUserExist(req.body.email);
  console.log(checkUserExist);

  if (checkUserExist.length > 0) {
    console.log("userExist");
    res.send(false);
  } else {
    let addUser = await addUsers.addUser(req.body);
    console.log(addUser);
    res.send(true);
  }
});
router.post(
  place.dataName[1],
  upload.single("uploadImage"),
  async (req, res) => {
    // console.log("ready123", req.file);
    let ImagingUpload = await ImageUploads.ImagingUpload(
      req.file.originalname,
      req.body.email,
      req.body.desc,
      req.body.Tag
    );
    console.log("hhhhh", req.body);
    // console.log(req.files)
    res.send(req.file.originalname);
  }
);
router.get(Address.dataName[7], async (req, res) => {
  console.log("came");

  const ImageGetting = await ImageUploads.ImageGetting()
    .then((response) => {
      console.log(response);
      res.send(response);
    })
    .catch((reject) => {
      console.log("weeeror");
    });
});
module.exports = router;

router.post(Address.dataName[3], async (req, res) => {
  const ImageDataSend = await ImageUploads.ImageDataSend(req.body.Id).then(
    (response) => {
      console.log("response id(ImageDataSend)", response);
      res.send(response);
    }
  );
});

router.post(Address.dataName[4], async (req, res) => {
  await ImageDb.findOne({ _id: req.body.Id }).then((response) => {
    // console.log("ssss",response)
    let result = response.Like.includes(req.body.UserId);
    // console.log(result)
    let Emails = req.body.UserId;
    if (result) {
      ImageDb.updateOne(
        { _id: req.body.Id },
        { $pullAll: { Like: [Emails] } }
      ).then(() => {
        ImageDb.findOne({ _id: req.body.Id }).then((response) => {
          res.send(response);
        });
      });
    } else {
      ImageDb.updateOne(
        { _id: req.body.Id },
        { $push: { Like: [Emails] } }
      ).then(() => {
        ImageDb.findOne({ _id: req.body.Id }).then((response) => {
          res.send(response);
        });
      });
    }
  });
  // res.send(TotalLike)
});
router.post(Address.dataName[5], async (req, res) => {
  ImageDb.updateOne(
    { _id: req.body.Id },
    { $push: { Comment: [req.body.objComment] } }
  ).then(() => {
    ImageDb.findOne({ _id: req.body.Id }).then((response) => {
      res.send(response);
    });
  });
});

router.post(Address.dataName[8], async (req, res) => {
  console.log("get call", req.body);

  let checkEmailExist = await checkForgotPasswordEmail.checkEmailData(req.body.email);
  console.log(checkEmailExist);

  if (checkEmailExist.length > 0) {
    console.log("userExist");
    let mailTransporter = nodemailer.createTransport({ 
      service: 'gmail', 
      auth: { 
          user: Address.email, 
          pass: Address.password
      } 
  });
  number=Math.floor(Math.random() * 100000); 
  // Number=Math.random() * 100000
    console.log(req.body.email,number)
  let mailDetails = { 
      from: Address.email, 
      to: req.body.email, 
      subject: 'Change Password', 
      text: 'Your Otp is'+ number
  }; 
  
    
  mailTransporter.sendMail(mailDetails, function(err, data) { 
      if(err) { 
          console.log('Error Occurs'); 
      } else { 
          console.log('Email sent successfully'); 
      } 
  }); 
  var obj={
    flag:true,
    num:number
  }
  res.send(obj)
  } else {
    res.send(false);
  }
});

router.post(Address.dataName[6],async(req,res)=>{
  console.log(req.body)
  UserDb.updateOne(
    { email: req.body.email },
     {$set:{ password: req.body.password }}).then((response)=>{
       console.log(response)
       res.send(response)
     }).catch((error)=>{
       console.log("erroe")
     })
})