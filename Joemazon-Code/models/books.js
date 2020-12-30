const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    author: {
        required: true,
        type: String
    },
    image: {
        default: '',
        type: String
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("book", BookSchema);