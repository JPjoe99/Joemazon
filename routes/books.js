const express = require("express");
const router = express.Router();
const Books = require("../models/books");

router.get("/", (req, res, next) => {
    Books.find({})
    .then(books => {
        console.log(books);
        var bookTitles = [];
        var bookImages = [];
        for (var i = 0; i < books.length; i++) {
            bookTitles.push(books[i].title);
            bookImages.push(books[i].image);
        }
        res.render("snippets/books", {titles: bookTitles, images: bookImages});
    })
    .catch(error => {
        return next(error);
    })
})

router.post("/", (req, res, next) => {
    Books.create(req.body)
    .then(book => {
        res.json(book);
    })
    .catch(error => {
        next(error);
    })
})

module.exports = router;

