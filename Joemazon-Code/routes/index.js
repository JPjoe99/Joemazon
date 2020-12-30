var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var authenticate = require("../authenticate")
var config = require("../config");
var jwt = require("jsonwebtoken");
var User = require("../models/users");

/* GET home page. */
router.get('/', (req, res, next) => {
  var token = req.cookies["id"];
  if (token == null) {
    return res.render("index", {logStatus: "Login", signupStatus: "Sign Up", accountStatus: false});
  }
  else {
    jwt.verify(token, config.secretKey, (error, user) => {
      if (error) {
        return console.log(error);
      }
      else if (user) {
        User.findById({_id: user._id})
        .populate("favourites")
        .then(user => {
          console.log(user);
          res.render("index", {logStatus: "Logout", account: "My Account", accountStatus: false, user: user});
        })
        .catch(error => {
          next(error);
        })
      }
    });
  }
});

module.exports = router;
