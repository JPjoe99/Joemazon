const mongoose = require("mongoose");
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const ProductSchema = new mongoose.Schema({
    type: {
        required: true,
        type: String
    },
    title: {
        required: true,
        type: String
    },
    author: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: String
    },
    image: {
        default: '',
        type: String
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    keywords: {
        default: '',
        type: Array
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("product", ProductSchema);