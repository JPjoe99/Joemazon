const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    type: {
        required: true,
        type: String
    },
    title: {
        required: true,
        type: String
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("product", ProductSchema);