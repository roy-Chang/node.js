const connection = require("../utils/db");

const express = require("express");
const router = express.Router();

router.get("/stock", async (req, res) => {
    let queryResults = await connection.queryAsync("SELECT * FROM stock;");

    res.json(queryResults)

})

module.exports = router;