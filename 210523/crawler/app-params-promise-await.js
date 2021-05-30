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
const { error } = require('console');
//從 stock.txt 讀股票代碼進來
const fs = require("fs");

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

async function stockCrawler() {
    try {
        let stockCode = await stockPromise();
        let axiosResult = await axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
            params: {
                response: "json",
                date: today,
                stockNo: stockCode,
            },
        });

        if (axiosResult.data.stat === "OK") {
            console.log(axiosResult.data);
        }

    } catch (err) {
        console.log("Data Error", err);
    } finally {
        console.log("Data End");
    }
}

stockCrawler();

