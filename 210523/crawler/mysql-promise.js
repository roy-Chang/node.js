

const axios = require('axios');
const { error } = require('console');
const fs = require("fs/promises");
const Promise = require("bluebird");
require('dotenv').config()

// connect mySQL
const mysql = require("mysql")
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});
connection = Promise.promisifyAll(connection);

(async function () {
    try {
        let stockCode = await fs.readFile("stock.txt", "utf8");
        await connection.connectAsync();
        let dbSearch = await connection.queryAsync("SELECT * FROM stock WHERE stock_id = ?", [stockCode]);
        if (dbSearch.length == 0) {
            let response = await axios.get(`http://www.twse.com.tw/zh/api/codeQuery?query=${stockCode}`);
            if (response.data.suggestions != "(無符合之代碼或名稱)") {
                let answer = await response.data.suggestions.shift().split("\t");
                if (answer.length >= 1) {
                    await connection.queryAsync("INSERT INTO stock (stock_id, stock_name) VALUES (?, ?)", [answer[0], answer[1]])
                    console.log("更新資料庫");
                } else {
                    console.log(answer[1]);
                    throw "查不到名稱"
                }
            } else {
                console.log("無此股票，請確認股票代碼是否正確");
            }
        } else {

            console.log("資料存在", "\n", `股票代碼: ${dbSearch[0].stock_id} 公司名稱: ${dbSearch[0].stock_name}`);

        }
    } catch (err) {
        console.error(err);
    } finally {
        connection.end();
    }
})();

