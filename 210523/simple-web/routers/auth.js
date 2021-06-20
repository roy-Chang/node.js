const connection = require("../utils/db");

const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const multer = require('multer')
const path = require("path");



// 自訂註冊表單規則
const registerRules = [
    body("email").isEmail().withMessage("請正確輸入 Email 格式"),
    body("password").isLength({ min: 6 }),
    body("confirmPassword").custom((value, { req }) => {
        return value === req.body.password;
    }),
];



const myStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // routes/auth.js -> 現在的位置
        // public/uploads -> 希望找到的位置
        // /routes/../public/uploads
        cb(null, path.join(__dirname, "../", "public", "upload"));
    },
    filename: function (req, file, cb) {
        // 抓出副檔名
        const ext = file.originalname.split(".").pop();
        // 組合出自己想要的檔案名稱
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
});


const uploader = multer({
    storage: myStorage,
    fileFilter: function (req, file, cb) {
        // console.log(file);
        //if (file.mimetype !== "image/jpeg") {
        //  return cb(new Error("不合法的 file type"), false);
        //}
        // file.originalname: Name of the file on the user's computer
        // 101.jpeg
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("是不合格的副檔名"));
        }
        // 檔案ＯＫ, 接受這個檔案
        cb(null, true);
    },
    limits: {
        // 限制檔案的上限 1M
        fileSize: 1024 * 1024,
    },
});







router.get("/register", (req, res) => {
    res.render("auth/register");
})
router.post("/register", uploader.single("photo"), registerRules, async (req, res, next) => {
    // console.log(req.body);
    // console.log(req.file);
    const validateResult = validationResult(req);
    if (!validateResult.isEmpty()) {
        return next(new Error("註冊表單錯誤"))
    }

    // 檢查是否註冊過
    let checkResult = await connection.queryAsync("SELECT * FROM members WHERE email=?", req.body.email)

    if (checkResult.length !== 0) {
        return next(new Error("Email已註冊"))
    }

    // 檢查 是否有選擇圖片
    let filepath = req.file ? "/uploads/" + req.file.filename : null;


    let insertResult = await connection.queryAsync("INSERT INTO members (email, password, name, photo) VALUES (?)", [[req.body.email, await bcrypt.hash(req.body.password, 10), req.body.name, filepath]])
    // let insertResult = await connection.queryAsync("INSERT INTO members (email, password, name) VALUES (?)", [[req.body.email, req.body.password, req.body.name]])

    res.send("POST PAGE");

})



router.get("/login", (req, res) => {
    res.render("auth/login");

})

const loginRules = [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
];
router.post("/login", loginRules, async (req, res, next) => {

    const validateResult = validationResult(req);
    if (!validateResult.isEmpty()) {
        return next(new Error("登入錯誤"))
    }

    // 檢查一下這個 email 存不存在
    let loginResult = await connection.queryAsync("SELECT * FROM members WHERE email=?", req.body.email)

    if (loginResult.length === 0) {
        res.send("登入失敗，查無此帳號")
        return next(new Error("查無此帳號"))
    }

    member = loginResult[0];

    // 比對密碼
    // 因為 bcrpt 每次加密的結果都不一樣 所以不能單純的比對字串
    // 必須要用bcrypt 提供的比對函式
    let result = await bcrypt.compare(req.body.password, member.password)
    console.log(member);
    if (result) {
        res.send("登入成功")
    } else {
        res.send("登入失敗，密碼錯誤")
    }
})


module.exports = router;