//今天日期
var date = new Date();
var nowYear = date.getFullYear().toString();
var nowMonth = "";
if ((date.getMonth() + 1) <= 10) {
    nowMonth = "0" + (date.getMonth() + 1).toString();
} else {
    nowMonth = (date.getMonth() + 1).toString();
}
var nowDate = (date.getDate() + 1).toString();
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
                        // console.log(response.data.date);
                        // console.log(response.data.title);
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
