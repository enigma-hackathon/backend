var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(upload.array());

var firebase = require("firebase");
var config = require("../config/keys");

firebase.initializeApp(config);

var database = firebase.database();

function writeUserData(userId, name, email, imageUrl) {
  firebase
    .database()
    .ref("users/" + userId)
    .set({
      username: name,
      email: email,
      profile_picture: imageUrl
    });
}

router.get("/users", function(req, res, next) {
  firebase
    .database()
    .ref("/users/")
    .once("value")
    .then(function(snapshot) {
      // var username = (snapshot.val() && snapshot.val().username) || "Anonymous";
      res.json(snapshot);
    });
});

router.post("/users/new", function(req, res) {
  console.log(req.body);
  var email = req.body.email;
  var name = req.body.name;
  var uid = req.body.uid;
  var photo = req.body.photo;
  writeUserData(uid, name, email, photo);
  res.json({ status: "Scuccess" });
});

module.exports = router;
