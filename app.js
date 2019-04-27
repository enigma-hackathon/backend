var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var router = express.Router();

var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");

var app = express();

// Firebase Set Up

// var firebase = require("firebase");
// var config = require("./config/keys");
// const uuidv4 = require("uuid/v4");

// firebase.initializeApp(config);

// var database = firebase.database();

// app.get("/users", (req, res) => {});
// function writeUserData(userId, name, email, imageUrl) {
//   firebase
//     .database()
//     .ref("users/" + userId)
//     .set({
//       username: name,
//       email: email,
//       profile_picture: imageUrl
//     });
// }

// writeUserData(
//   uuidv4(),
//   "Nour Cherif Essoussi",
//   "nourcherifsoussi@gmail.com",
//   "https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/49489234_2286860368227132_8734844250241368064_n.jpg?_nc_cat=106&_nc_ht=scontent-mia3-1.xx&oh=e3ec691887f9233600b94386d2d4d604&oe=5D2E29D2"
// );
// writeUserData(
//   uuidv4(),
//   "Mohamed Soussi",
//   "mo@daycationapp.com",
//   "https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/15349672_10211488913042333_1732675283537726846_n.jpg?_nc_cat=100&_nc_ht=scontent-mia3-1.xx&oh=ac8c9846eb65d07fce995fcaa89c6c9c&oe=5D3D1827"
// );

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
