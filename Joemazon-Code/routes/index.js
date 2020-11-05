var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var authenticate = require("../authenticate")
var config = require("../config");
var jwt = require("jsonwebtoken");

/* GET home page. */
router.get('/', (req, res, next) => {
  var token = req.cookies["id"];
  if (token == null) {
    return res.render("index", {logStatus: "Login", signupStatus: "Sign Up"});
  }
  else {
    jwt.verify(token, config.secretKey, (error, user) => {
      if (error) {
        return console.log(error);
      }
      else if (user) {
        res.render("index", {logStatus: "Logout"});
      }
    });
  }
});

module.exports = router;
