const axios = require('axios');

//從 stock.txt 讀股票代碼進來
const fs = require("fs");
fs.readFile("stock.txt", "utf8", (err, data) => {
    if (err) {
        return console.error(err);
    }
    console.log(`讀到的 stock code: ${data}`);
    // const stockCode =
    axios
        .get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
            params: {
                reponse: "josn",
                date: "20210523",
                stockNo: data,
            },
        })
        .then(function (response) {
            if (response.data.stat === "OK") {
                console.log(response.data.date);
                console.log(response.data.title);
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
})