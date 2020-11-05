const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    emailAddress: {
        required: true,
        type: String
    }
},
{
    timestamps: true
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", UserSchema);