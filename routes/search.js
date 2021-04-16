var router = require("express").Router();
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/Joemazon";
let Products = require("../models/product");


router.route("/")
.get((req, res, next) => {
    Products.find({})
    .then(products => {
        return res.json(products);
    })
    .catch(error => {
        return next(error);
    })
    // MongoClient.connect(url, (error, client) => {
    //     const db = client.db("Joemazon");
    //     db.listCollections().toArray()
    //     .then(cols => {
    //         var cursor = db.collection("products").find();
    //         cursor.toArray()
    //         .then(array => {
    //             if (req.query.q == 0) {
    //                 if (req.cookies.id == null) {
    //                     res.render("newsnippets/products", {products: array, logStatus: "Login", signupStatus: "Sign Up"});
    //                 }
    //                 else {
    //                 res.render("newsnippets/products", {products: array, account: "My Account", logStatus: "Logout"});
    //                 }
    //             }
    //             else {
    //                 var selectedProducts = [];
    //                 for (var i = 0; i < array.length; i++) {
    //                     if (array[i].type.toLowerCase() == req.query.q.toLowerCase()) {
    //                         var string = array[i].title + " - " + array[i].author;
    //                         selectedProducts.push(array[i]);
    //                     }
    //                     else {
    //                         for (var j = 0; j < array[i].keywords.length; j++) {
    //                             if (array[i].keywords[j].toLowerCase() == req.query.q.toLowerCase()) {
    //                                 var string = array[i].title + " - " + array[i].author;
    //                                 selectedProducts.push(array[i]);
    //                             }
    //                         }
    //                     }
    //                 }
    //                 console.log(req.cookies);
    //                 if (req.cookies.id == null) {
    //                     res.render("newsnippets/products", {products: selectedProducts, logStatus: "Login", signupStatus: "Sign Up"});
    //                 }
    //                 else {
    //                     res.render("newsnippets/products", {products: selectedProducts, account: "My Account", logStatus: "Logout"});
    //                 }
    //             }
    //             //res.end();
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })


    // })
})

module.exports = router;