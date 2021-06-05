

const axios = require('axios');
//從 stock.txt 讀股票代碼進來
const { error } = require('console');
const fs = require("fs");
const moment = require('moment');
const Promise = require("bluebird");

// function stockPromise() {
//     return new Promise((resolve, reject) => {
//         // var data = fs.readFileSync('stock.txt', 'utf8');
//         fs.readFile("stock.txt", "utf8", (err, data) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(data)
//         })
//     });
// }

// stockPromise()


const readFileBB = Promise.promisify(fs.readFile);
readFileBB("stock.txt", "utf-8")
    .then((stockCode) => {
        console.log(stockCode);
        return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
            params: {
                response: "json",
                date: moment().format("YYYYMMDD"),
                stockNo: stockCode,
            },
        });
    })
    .then((response) => {
        if (response.data.stat === "OK") {
            console.log(response.data);
        }
    })
    .catch((error) => {
        console.log(error);
    });
