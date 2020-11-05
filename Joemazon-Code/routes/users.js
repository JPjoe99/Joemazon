var express = require('express');
var router = express.Router();
var User = require("../models/users");
var passport = require("passport");
var bodyParser = require("body-parser");
var authenticate = require("../authenticate");


/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find()
  .then(users => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(users);
  })
  .catch(error => {
    next(error);
  })
});

router.route("/login")
.get((req, res) => {
  res.statusCode = 200;
  //res.setHeader("Content-Type", "text/html");
  res.render("login");
})
.post(passport.authenticate("local"), (req, res) => {
  var token = authenticate.getToken({_id: req.user._id});
  res.cookie("id", token, {maxAge: 1000});
  res.redirect("/");
});

router.route("/sign-up")
.get((req, res) => {
    res.render("signup");
})
.post((req, res) => {
    console.log(req.body);
    User.register(new User({username: req.body.username, emailAddress: req.body.emailAddress}),
    req.body.password)
    .then(user => {
        user.save()
        .then(user => {
            passport.authenticate("local")(req, res, () => {
                res.statusCode = 200;
                //res.setHeader("Content-Type")
                res.json({success: true, status: "Registration Successful"});
            })            
        })
        .catch(error => {
            res.statusCode = 500;
            //res.setHeader
            res.json({error: error});
            return;
        })
    })
    .catch(error => {
        console.log(error);
    })
})

module.exports = router;
