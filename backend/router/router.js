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
var checkForgotPasswordEmail = require("../Api/checkForgotPasswordEmail");
var nodemailer = require("nodemailer");
var UserDb = require("../schemas/userSchema");
var Address = require("../configs/config");
var checkFriendEmail = require("../Api/checkFriendEmail");
var addFriend = require("../Api/checkFriendEmail");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var storage1 = multer.diskStorage({
  destination: "./image",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var storage2 = multer.diskStorage({
  destination: "./profileImage",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage1 });
var uploadImage = multer({ storage: storage2 });
router.post(place.dataName[0], async (req, res) => {
  let checkExistData = await checkingUserData.checkExistData(req.body);
  if (checkExistData.length > 0) {
    res.send(checkExistData);
  } else {
    res.send(false);
  }
});

router.post(place.dataName[2], async (req, res) => {
  let checkUserExist = await checkUserExists.checkUserExist(req.body.email);

  if (checkUserExist.length > 0) {
    res.send(false);
  } else {
    let addUser = await addUsers.addUser(req.body);
    res.send(true);
  }
});
router.post(
  place.dataName[1],
  upload.single("uploadImage"),
  async (req, res) => {
    console.log("req.body.fullName", req.body.fullName);
    let ImagingUpload = await ImageUploads.ImagingUpload(
      req.file.originalname,
      req.body.email,
      req.body.desc,
      req.body.Tag,
      req.body.profilePic,
      req.body.fullName
    );
    res.send(req.file.originalname);
  }
);
router.get(Address.dataName[7], async (req, res) => {
  const ImageGetting = await ImageUploads.ImageGetting()
    .then((response) => {
      res.send(response);
    })
    .catch((reject) => {});
});
module.exports = router;

router.post(Address.dataName[3], async (req, res) => {
  const ImageDataSend = await ImageUploads.ImageDataSend(req.body.Id).then(
    (response) => {
      res.send(response);
    }
  );
});

router.post(Address.dataName[4], async (req, res) => {
  await ImageDb.findOne({ _id: req.body.Id }).then((response) => {
    let result = response.Like.includes(req.body.UserId);
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
  let checkEmailExist = await checkForgotPasswordEmail.checkEmailData(
    req.body.email
  );

  if (checkEmailExist.length > 0) {
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: Address.email,
        pass: Address.password,
      },
    });
    number = Math.floor(Math.random() * 100000);
    let mailDetails = {
      from: Address.email,
      to: req.body.email,
      subject: "Change Password",
      text: "Your Otp is" + number,
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occurs");
      } else {
        console.log("Email sent successfully");
      }
    });
    var obj = {
      flag: true,
      num: number,
    };
    res.send(obj);
  } else {
    res.send(false);
  }
});

router.post(Address.dataName[6], async (req, res) => {
  UserDb.updateOne(
    { email: req.body.email },
    { $set: { password: req.body.password } }
  )
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {});
});

router.post("/Profile", uploadImage.single("uploadImage"), async (req, res) => {
  let ProfileUpload = await ImageUploads.ProfileUpload(
    req.file.originalname,
    req.body.userName
  );

  res.send(req.file.originalname);
});
router.post("/UserData", async (req, res) => {
  UserDb.find({ email: req.body.userName }).then((response) => {
    res.send(response);
  });
});

router.post("/searchCategories", async (req, res) => {
  ImageDb.find({ Tag: req.body.Tag }).then((response) => {
    res.send(response);
  });
});
router.post("/updateName", async (req, res) => {
  UserDb.updateOne(
    { email: req.body.email },
    {
      $set: {
        Sex: req.body.Sex,
        profileDesc: req.body.profileDesc,
        Fname: req.body.Fname,
        Lname: req.body.Lname,
      },
    }
  ).then(() => {
    UserDb.find({ email: req.body.email }).then((response) => {
      console.log(response);
      res.send(response);
    });
  });
});
router.post("/userDetails", async (req, res) => {
  console.log(req.body);
  UserDb.find({ email: req.body.email }).then((response) => {
    console.log("user detals is", response);
    res.send(response);
  });
});

///frnd req
router.post("/checkFriendEmail", async (req, res) => {
  console.log(req.body);
  let checkFriendsEmail = await checkFriendEmail.checkFriendEmail(
    req.body.friendEmail
  );
  console.log("checkFriendExist", checkFriendsEmail);
  if (checkFriendsEmail.length > 0) {
    await UserDb.findOne({ email: req.body.friendEmail }).then((response) => {
      let result = response.pendingFriendRequest.includes(req.body.userEmail);
      console.log(result);
      if (result) {
        UserDb.updateOne(
          { email: req.body.friendEmail },
          {
            $pullAll: {
              pendingFriendRequest: [req.body.userEmail],
            },
          }
        )
          .then(() => {
            UserDb.updateOne(
              { email: req.body.userEmail },
              {
                $pullAll: {
                  sendFriendRequest: [req.body.friendEmail],
                },
              }
            );
          })
          .then((response) => {
            console.log(":--", response);
            UserDb.find({ email: req.body.userEmail }).then((response) => {
              console.log(response);
              res.send(response);
            });
          });
      } else {
        console.log("result:", result);
        UserDb.updateOne(
          { email: req.body.friendEmail },
          {
            $push: {
              pendingFriendRequest: [req.body.userEmail],
            },
          }
        )
          .then(() => {
            UserDb.updateOne(
              { email: req.body.userEmail },
              {
                $push: {
                  sendFriendRequest: [req.body.friendEmail],
                },
              }
            );
          })
          .then((response) => {
            console.log("madhav", response);
            UserDb.find({ email: req.body.userEmail }).then((response) => {
              console.log("here is mhy", response);
              res.send("my" + response);
            });
          });
      }
    });
  }
});
router.post("/friendRequest", async (req, res) => {
  UserDb.findOne({ email: req.body.userEmail }).then((response) => {
    res.send(response);
  });
});

router.post("/pendingFriendRequest", async (req, res) => {
  console.log(req.body);
  UserDb.findOne({ email: req.body.email }).then((response) => {
    console.log(response.pendingFriendRequest);
    res.send(response.pendingFriendRequest);
  });
});

router.post("/rejectFriendRequest", async (req, res) => {
  console.log("rejectFriendRequest:", req.body);
  UserDb.updateOne(
    { email: req.body.email },
    {
      $pullAll: {
        pendingFriendRequest: [req.body.rejectFR],
      },
    }
  ).then(() => {
    UserDb.find({ email: req.body.email }).then((response) => {
      res.send(response.pendingFriendRequest);
    });
  });
});
router.post("/acceptFriendRequest", async (req, res) => {
  UserDb.updateOne(
    { email: req.body.email },
    {
      $push: {
        friends: [req.body.acceptFR],
      },

      $pullAll: {
        pendingFriendRequest: [req.body.acceptFR],
      },
    }
  ).then(() => {
    UserDb.find({ email: req.body.email }).then((response) => {
      console.log("a:::::", response);
      res.send(response);
    });
  });
});
router.get("/FriendList", async (req, res) => {
  console.log("herere");
  UserDb.find({}).then((response) => {
    console.log("a:::::", response.email);
    res.send(response.email);
  });
});
