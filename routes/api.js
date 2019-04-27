var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var firebase = require("firebase");
var config = require("../config/keys");

firebase.initializeApp(config);

var database = firebase.database();

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
  var email = req.body.email;
  var name = req.body.name;
  var uid = req.body.uid;
  var photo = req.body.photo;
  console.log("User name = " + user_name + ", password is " + password);
  res.json({ status: "Scuccess" });
});

module.exports = router;
