var router = require("express").Router();

router.route("/")
.get((req, res, next) => {
    //res.redirect("/")
})

router.route("q=:id")
.get((req, res, next) => {
    res.send("Yo")
})


module.exports = router;