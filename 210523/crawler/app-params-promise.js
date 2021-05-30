//今天日期
var date = new Date();
var nowYear = date.getUTCFullYear().toString();
var nowMonth = "";
if ((date.getUTCMonth() + 1) <= 10) {
    nowMonth = "0" + (date.getUTCMonth() + 1).toString();
} else {
    nowMonth = (date.getUTCMonth() + 1).toString();
}
var nowDate = date.getUTCDate().toString();
var today = nowYear + nowMonth + nowDate;




const axios = require('axios');
//從 stock.txt 讀股票代碼進來
const fs = require("fs");

function stockPromise() {
    return new Promise((resolve, reject) => {
        // var data = fs.readFileSync('stock.txt', 'utf8');
        fs.readFile("stock.txt", "utf8", (err, data) => {
            if (err) {
                return console.error(err);
            }
            axios
                .get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
                    params: {
                        reponse: "josn",
                        date: today,
                        stockNo: data,
                    },
                })
                .then(function (response) {
                    if (response.data.stat === "OK") {
                        resolve(response.data);
                    }
                })
        })
    });
}
stockPromise()
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });