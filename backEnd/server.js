var express = require("express");
var cors = require("cors");
var app = express();
var mongoose = require("mongoose");
var router = require("./router/router");
var bodyParser = require("body-parser");
var port =require("./configs/config");



mongoose.connect(port.databaseURL, {
  useNewUrlParser: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static("images"))

app.use("/", router);


app.listen(3001, () => {
  console.log("server is running");
});
