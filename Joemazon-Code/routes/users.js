var express = require('express');
var router = express.Router();
var User = require("../models/users");
var passport = require("passport");
var bodyParser = require("body-parser");
var authenticate = require("../authenticate");
const { response } = require('express');
var mongoose = require("mongoose");


/* GET users listing. */
router.get('/', function(req, res, next) {
  User.findById(req.cookies.userID)
  .then(user => {
    res.render("index", {logStatus: "Logout", account: "My Account", accountStatus: true});
  })
  .catch(error => {
    return next(error);
  })

});

router.route("/login")
.get((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.render("login");
})
.post(passport.authenticate("local", {failureRedirect: "/users/login"}), (req, res) => {
  var token = authenticate.getToken({_id: req.user._id});
  res.cookie("id", token, {maxAge: 900000});
  res.cookie("userID", req.user._id, {magAge: 900000});
  res.redirect("/");
});


router.route("/sign-up")
.get((req, res) => {
    res.render("signup");
})
.post((req, res) => {
    console.log(req.body);
    User.register(new User({firstName: req.body.firstName,
      lastName: req.body.lastName, username: req.body.username, emailAddress: req.body.emailAddress}),
    req.body.password)
    .then(user => {
        user.save()
        .then(user => {
            passport.authenticate("local")(req, res, () => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/html");
                var token = authenticate.getToken({_id: req.user._id});
                res.cookie("id", token, {maxAge: 900000});
                res.cookie("userID", req.user._id);
                console.log("Registration successful!");
                res.redirect("/");
            })            
        })
        .catch(error => {
            res.statusCode = 500;
            res.setHeader("Content-Type", "text/html");
            res.json({error: error});
            return;
        })
    })
    .catch(error => {
        console.log(error);
    })
})

router.route("/logout")
.get((req, res, next) => {
  if (req.cookies.id) {
    res.clearCookie("id");
    res.clearCookie("userID");
    res.redirect("/");
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
})

router.get("/order-history", (req, res, next) => {
  res.render("orders");
})

router.route("/favourites")
.get((req, res, next) => {
  User.findById(req.cookies.userID)
  .populate("favourites")
  .then(user => {
    console.log("We are here");
    res.send(user.favourites)
  })
  .catch(error => {
    console.log(error);
  })
})
.post((req, res, next) => {
  var productID = mongoose.Types.ObjectId(req.cookies.productID);
  User.findById(req.cookies.userID)
  .then(user => {
    if (user == null) {
      res.redirect("http://localhost:3000/user/login");
    }
    else {
      if (user.favourites.indexOf(productID) == -1) {
        user.favourites.push(productID);
        user.save()
        .then(user => {
          User.findById(user._id)
          .then(user => {
            res.redirect("http://localhost:3000");
          })
          .catch(error => {
            return next(error);
          })
        })
        .catch(error => {
          return next(error);
        })
      }
      else {
        console.log("Product already in your wish list!");
        res.send("Product in your wish list already!")
      }
    }
  })      
  .catch(error => {
    return next(error);
  })
})


module.exports = router;
