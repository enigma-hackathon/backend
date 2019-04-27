var express = require("express");
var router = express.Router();

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

module.exports = router;
