const axios = require('axios');
//從 stock.txt 讀股票代碼進來
const fs = require("fs");

function stockPromise() {
    return new Promise((resolve, reject) => {
        var data = fs.readFileSync('stock.txt', 'utf8');
        // console.log(data);
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
                    resolve(response.data);
                    // console.log(response.data.date);
                    // console.log(response.data.title);
                }
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
