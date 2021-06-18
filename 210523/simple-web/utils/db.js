

const Promise = require("bluebird");
require('dotenv').config()
const mysql = require("mysql")

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});
connection = Promise.promisifyAll(connection);

module.exports = connection;