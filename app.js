var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var passport = require("passport");
let bodyParser = require("body-parser");
let cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require('./routes/users');
var booksRouter = require("./routes/books");
var searchRouter = require("./routes/search");
var productRouter = require("./routes/products");

var config = require("./config");
const { dirname } = require('path');

var connect = mongoose.connect(config.mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true});
connect.then((db) => {
  console.log("Succesfully connected to the Joemazon database!");
})
.catch((error) => {
  console.log(error);
})

var app = express();

app.all("*", (req, res, next) => {
  if (req.secure) {
    return next();
  }
  else {
      res.redirect(307, "https://" + req.hostname + ":" + app.get("secPort") + req.url);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.use("/views", express.static("views"))
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/views", express.static(path.join(__dirname, "views")));
// app.use(express.static("views"));
app.use(express.static(path.join(__dirname + "/public")));



app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use("/search", searchRouter);
app.use("/products", productRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
