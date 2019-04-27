var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();
var cors = require("cors");
router.use(cors());

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
      name: name,
      email: email,
      picture: imageUrl
    });
}

// function updateUserData(userId, interests) {
//   firebase
//     .database()
//     .ref("users/" + userId)
//     .update({
//       interests: interests
//     });
// }

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
  writeUserData(uid, name, email, photo);
  res.json({ status: "Scuccess" });
});

router.post("/match", function(req, res) {
  var loklys = [];
  var interests = req.body.interests.split(",");
  console.log("Nourcs Interest : ", req.body);
  // var interests = ["Food", "Adventure"];

  firebase
    .database()
    .ref("/loklys/")
    .once("value")
    .then(function(snapshot) {
      loklys = Object.entries(snapshot.val());
      loklys.forEach(lokly => {
        let arr = lokly[1].interests;
        let verif = true;
        if (interests.length <= arr.length) {
          for (let i = 0; i < interests.length; i++) {
            if (arr.includes(interests[i])) {
              verif = true;
            } else {
              verif = false;
              break;
            }
          }
          if (verif) {
            res.json({ status: true, lokly });
          }
        }
      });
      res.json({ status: false });
    });
});

module.exports = router;
