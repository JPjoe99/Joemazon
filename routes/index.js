var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var authenticate = require("../authenticate")
var config = require("../config");
var jwt = require("jsonwebtoken");
var User = require("../models/users");
let path = require("path");
const passport = require('passport');

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", {logStatus: "Login"});
})

// router.get('/', (req, res, next) => {
  // passport.authenticate("local", {session: false}, (err, user, info) => {
  //   if (err) {
  //     console.log("here");
  //     return next(err);
  //   }
  //   if (!user) {
  //     console.log("No user");
  //   }
  //   else {
  //     console.log(user);
  //     res.render("index");
  //   }
  // res.sendFile(path.join(__dirname, "../views/index.html"));
  // res.end();
  // var token = req.cookies["id"];
  // if (token == null) {
  //   return res.render("index", {logStatus: "Login", signupStatus: "Sign Up", accountStatus: false});
  // }
  // else {
  //   jwt.verify(token, config.secretKey, (error, user) => {
  //     if (error) {
  //       return console.log(error);
  //     }
  //     else if (user) {
  //       User.findById({_id: user._id})
  //       .populate("favourites")
  //       .then(user => {
  //         console.log(user);
  //         res.render("index", {logStatus: "Logout", account: "My Account", accountStatus: false, user: user});
  //       })
  //       .catch(error => {
  //         next(error);
  //       })
  //     }
  //   });
  // }
  //res.send("Hello");
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       console.log("No user");
//       return res.redirect("/");
//     }
//     console.log(user);
//     return res.redirect("/");
//   })(req, res, next);
// });

module.exports = router;
