const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Products = require("../models/product");

router.get("/", (req, res, next) => {
    Products.findById(req.cookies.productID)
    .then(product => {
        if (req.cookies.id == null) {
            res.render("snippets/product", {product: product, logStatus: "Login", signupStatus: "Sign Up"});
        }
        else {
            res.render("snippets/product", {product: product, account: "My Account", logStatus: "Logout"});

        }
    })
    .catch(error => {
        return next(error);
    })
})

router.post("/", (req, res, next) => {
    Products.create(req.body)
    .then(product => {
        res.json(product);
    })
    .catch(error => {
        next(error);
    })
})

router.get("/product=:id", (req, res, next) => {
    res.cookie("productID", req.params.id);
    res.redirect("/products");
    // Products.findById(req.params.id)
    // .then(product => {
    //     res.cookie("productID", r)
    //     // if (req.cookies.id == null) {
    //     //     res.render("snippets/product", {product: product, logStatus: "Login", signupStatus: "Sign Up"});
    //     // }
    //     // else {
    //     //     res.render("snippets/product", {product: product, account: "My Account"});
    //     // }
    // })
    // .catch(error => {
    //     next(error);
    // })
})

router.get("/add-to-favourites", (req, res, next) => {
    console.log(req.cookies.productID);
    Products.findById(req.cookies.productID)
    .then(product => {
        console.log(product.favourites);
        res.send(product.favourites);
    })
    .catch(error => {
        return next(error);
    })
})

// router.get("/:id", (req, res, next) => {
//     console.log(mongoose.Types.ObjectId.isValid(req.params.id));
//     console.log(req.cookies);
//     res.send("Hello");
// })

module.exports = router;

