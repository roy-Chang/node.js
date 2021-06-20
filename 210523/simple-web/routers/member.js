const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("auth/member");
})


module.exports = router;