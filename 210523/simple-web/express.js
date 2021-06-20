// 資料庫連線
const connection = require("./utils/db");
// require('dotenv').config()

const express = require("express");
let app = express();

// middleware 中間件 中介函式
// 在 express 裡
// req->router
// req->middlewares....->router



// 前端送 json data ， express 才能解析
app.use(express.json());

// 取得cookie資料
const cookieParser = require("cookie-parser");
app.use(cookieParser({
}));
// console.log(process.env.SESSION_SECRET);
// 處理 session 資料
const expressSession = require("express-session");
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,

}))
// 加上這個中間件 可以解讀POST後的的資料
app.use(express.urlencoded({ extended: false }));


// 可以指定一個或多個目錄或是"靜態資源目錄"
// 自動幫你為 public 裡面的檔案建立路由
// /javascripts/api.js
// /styles/main.css
// /images/00.jpg
app.use(express.static("public"));

// 第一個 : views 變數
// 第二個 : views 檔案夾名稱
app.set("views", "views");
// 告訴 express 我們用的 view engine 是 pug
app.set("view engine", "pug");

// 把req.session 設定給res.locals
app.use(function (req, res, next) {
    // 把 request 的 session 資料設定給 res的 locals
    // views 就可以取得資料
    res.locals.member = req.session.member;
    next();
})


app.use(function (req, res, next) {
    let current = new Date();
    console.log("someone visited at ", current);
    next();
})

// stock 模組
let stockRouter = require("./routers/stock");
app.use("/stock", stockRouter);
// stock api router
let apiRouter = require("./routers/api");
app.use("/api", apiRouter);
// auth router
let authRouter = require("./routers/auth");
app.use("/user", authRouter);
// member router
let memberRouter = require("./routers/member");
app.use("/member", memberRouter);



// 路由 router
app.get("/", function (req, res) {
    // res.send("Hello Express")

    res.cookie("lang", "zh-TW");


    res.render("index");
})
app.get("/about", function (req, res) {
    // res.send("About Express")
    res.render("about");
})
app.get("/test", function (req, res) {

    res.send("Test Express")
})

// app.get("/stock", async (req, res) => {
//     let queryResults = await connection.queryAsync("SELECT * FROM stock;");
//     res.render("stock/list", {
//         stocks: queryResults,
//     });
// })

// app.get("/stock/:stockCode", async (req, res) => {
//     let queryResultsStocks = await connection.queryAsync("SELECT * FROM stock WHERE stock_id = ?;", req.params.stockCode);
//     let queryResultsPrices = await connection.queryAsync("SELECT*FROM stock_price WHERE stock_id = ? ORDER BY date;", req.params.stockCode)
//     res.render("stock/detail", {
//         stocks: queryResultsStocks,
//         stockPrices: queryResultsPrices
//     });
// })


app.use(function (req, res, next) {
    // 一旦進入這裡 表示前面的路由都找不到
    // http status code: 404
    res.status(404);
    res.render("404");
});



// 500 error
// 放在所有的路由後面
// 一定要有四個參數 ---> 最後的錯誤處理

app.use(function (err, req, res, next) {
    console.log(err.message);
    res.status(500);
    res.send("500-Internal Server Error");
});



app.listen(3000, async () => {

    await connection.connectAsync();
    console.log("run in port 3000");
})