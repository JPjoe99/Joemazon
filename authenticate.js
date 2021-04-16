const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/users");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");

var config = require("./config");
var opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

let cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
}

opts.jwtFromRequest = cookieExtractor;


exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey, {expiresIn: 3600});
}

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id},
            (err, user) => {
                if (err) {
                    console.log("ERROR");
                    return done(err, false);
                }
                else if (user) {
                    console.log("USER FOUND");
                    return done(null, user);
                }
                else {
                    return done(null, false);
                }
            })
    }))

exports.verifyUser = passport.authenticate("jwt", {session: false});