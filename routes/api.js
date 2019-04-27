var express = require("express");
var router = express.Router();
var config = require("../config/keys");

/* GET Api page. */

router.get("/", function(req, res, next) {
  console.log("ASBOUUUUJA");
  res.json(config);
});

module.exports = router;
