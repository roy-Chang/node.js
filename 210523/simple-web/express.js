const express = require("express");
let app = express();

// middleware 中間件 中介函式
// 在 express 裡
// req->router
// req->middlewares....->router
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