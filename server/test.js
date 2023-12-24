require("dotenv").config();
const sql = require("mysql2");
const { getTransactionsByUsername, userCheck } = require("./database.js");
const addUser = require("./database.js").addUser
const addTransaction = require("./database.js").addTransaction
const connection = sql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
})
connection.connect((err) => {
    if (err) {
        throw err
    } else {
        console.log("Connected");
    }
})
// addUser("test", "test", "test", "test", "test", "test", "test", connection) DONE
// addTransaction("test", "test", true, 200, connection) DONE
let res = getTransactionsByUsername("test", connection)
let a = 1
// let res = userCheck("test", "test", connection) 
// res.then((val)=>{
//     console.log(val)
// }) DONE, use it only like this
console.log(a)
connection.end()