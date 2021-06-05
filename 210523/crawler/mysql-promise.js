

const axios = require('axios');
const { error } = require('console');
const fs = require("fs/promises");
const Promise = require("bluebird");

// connect mySQL
const mysql = require("mysql")
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'stock'
});
connection = Promise.promisifyAll(connection);

(async function () {
    try {
        let stockCode = await fs.readFile("stock.txt", "utf8");
        await connection.connectAsync();
        let result = await connection.queryAsync("SELECT * FROM stock");
        if (result.length >= 0) {
            let dbSearch = await connection.queryAsync("SELECT * FROM stock WHERE stock_id = ?", [stockCode]);
            if (dbSearch.length == 0) {
                let response = await axios.get(`http://www.twse.com.tw/zh/api/codeQuery?query=${stockCode}`);
                let answer = await response.data.suggestions.shift().split("\t");
                if (answer.length > 1) {
                    await connection.queryAsync("INSERT INTO stock (stock_id, stock_name) VALUES (?, ?)", [answer[0], answer[1]])
                    console.log("更新資料庫");
                } else {
                    console.log(answer[1]);
                    throw "查不到名稱"
                }
            } else {
                console.log("資料存在, ", dbSearch);
            }
        } else {
            console.log("資料庫沒有資料");
        }
    } catch (err) {
        console.error(err);
    } finally {
        connection.end();
    }
})();

