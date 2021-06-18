const express = require("express");
let app = express();

// middleware 中間件 中介函式
// 在 express 裡
// req->router
// req->middlewares....->router


// 可以指定一個或多個目錄或是"靜態資源目錄"
// 自動幫你為 public 裡面的檔案建立路由
app.use(express.static("public"));


app.use(function (req, res, next) {
    let current = new Date();
    console.log("someone visited at ", current);
    next();
})



// 路由 router
app.get("/", function (req, res) {
    res.send("Hello Express")
})
app.get("/about", function (req, res) {
    res.send("About Express")
})
app.get("/test", function (req, res) {
    res.send("Test Express")
})
app.listen(3000, () => {
    console.log("run in port 3000");
})