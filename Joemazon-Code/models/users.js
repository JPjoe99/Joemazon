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
    },
    address: {
        numberOrName: {
            default: "",
            type: String
        },
        street: {
            default: "",
            type: String
        },
        county: {
            default: "",
            type: String
        },
        postCode: {
            default: "",
            type: String
        }
    },
    favourites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    ],
    basket: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    ]
},
{
    timestamps: true
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", UserSchema);