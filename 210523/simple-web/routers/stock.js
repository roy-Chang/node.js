const connection = require("../utils/db");
// routes/stock.js
const express = require("express");
// 可以把 router 想成一個小的 獨立的應用
const router = express.Router();

router.get("/", async (req, res) => {
    let queryResults = await connection.queryAsync("SELECT * FROM stock;");
    res.render("stock/list", {
        stocks: queryResults,
    });
})

router.get("/:stockCode", async (req, res) => {
    let queryResultsStocks = await connection.queryAsync("SELECT * FROM stock WHERE stock_id = ?;", req.params.stockCode);
    let queryResultsPrices = await connection.queryAsync("SELECT*FROM stock_price WHERE stock_id = ? ORDER BY date;", req.params.stockCode)
    res.render("stock/detail", {
        stocks: queryResultsStocks,
        stockPrices: queryResultsPrices
    });
})



module.exports = router;