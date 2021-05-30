//今天日期
var date = new Date();
var nowYear = date.getFullYear().toString();
var nowMonth = "";
if ((date.getMonth() + 1) <= 10) {
    nowMonth = "0" + (date.getMonth() + 1).toString();
} else {
    nowMonth = (date.getMonth() + 1).toString();
}
var nowDate = date.getUTCDate().toString();
var today = nowYear + nowMonth + nowDate;




const axios = require('axios');
//從 stock.txt 讀股票代碼進來
const { error } = require('console');
const fs = require("fs");
const moment = require('moment');

function stockPromise() {
    return new Promise((resolve, reject) => {
        // var data = fs.readFileSync('stock.txt', 'utf8');
        fs.readFile("stock.txt", "utf8", (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data)
        })
    });
}


stockPromise()
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
