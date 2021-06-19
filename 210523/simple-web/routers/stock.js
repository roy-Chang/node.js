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

router.get("/:stockCode", async (req, res, next) => {

    let queryResultsStocks = await connection.queryAsync("SELECT * FROM stock WHERE stock_id = ?;", req.params.stockCode);



    let count = await connection.queryAsync("SELECT COUNT(*) as total FROM stock_price WHERE stock_id = ?;", req.params.stockCode);

    const total = count[0].total; //總共幾筆
    const perPage = 10; // 一頁10筆
    const lastPage = Math.ceil(total / perPage); // 總共幾頁

    const currentPage = req.query.page || 1; // 新增page頁 預設第一頁
    const offset = (currentPage - 1) * perPage;


    if (queryResultsStocks.length === 0) {
        // throw new Error("查無代碼");
        // 查不到代碼 not found
        next(); // 進入 404
    }

    queryResultsStocks = queryResultsStocks[0]; //??

    let queryResultsPrices = await connection.queryAsync(
        "SELECT*FROM stock_price WHERE stock_id = ? ORDER BY date LIMIT ? OFFSET ?;"
        , [req.params.stockCode, perPage, offset]
    );

    console.log(queryResultsPrices);
    res.render("stock/detail", {
        stocks: queryResultsStocks,
        stockPrices: queryResultsPrices,
        pagination: {
            lastPage,
            currentPage,
            total,
        }
    });
})



module.exports = router;