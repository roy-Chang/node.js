const connection = require("./utils/db");

const express = require("express");
let app = express();

// middleware 中間件 中介函式
// 在 express 裡
// req->router
// req->middlewares....->router


// 可以指定一個或多個目錄或是"靜態資源目錄"
// 自動幫你為 public 裡面的檔案建立路由
app.use(express.static("public"));

// 第一個 : views 變數
// 第二個 : views 檔案夾名稱
app.set("views", "views");
// 告訴 express 我們用的 view engine 是 pug
app.set("view engine", "pug");


app.use(function (req, res, next) {
    let current = new Date();
    console.log("someone visited at ", current);
    next();
})



// 路由 router
app.get("/", function (req, res) {
    // res.send("Hello Express")
    res.render("index");
})
app.get("/about", function (req, res) {
    // res.send("About Express")
    res.render("about");
})
app.get("/test", function (req, res) {

    res.send("Test Express")
})

app.get("/stock", async (req, res) => {
    let queryResults = await connection.queryAsync("SELECT * FROM stock;");
    res.render("stock/list")
    stocks = queryResults;

})



app.listen(3000, async () => {

    await connection.connectAsync();
    console.log("run in port 3000");
})