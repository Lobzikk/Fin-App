const sql = require("mysql2")
require("dotenv").config()
/**
 * @param {string} name 
 * @param {string} password 
 * @param {string} key1 
 * @param {string} key2 
 * @param {string} key3 
 * @param {string} key4 
 * @param {string} key5 
 * @param {sql.Connection} connection 
 */
function addUser(name, password, connection) {
    connection.query("INSERT INTO users(username, password) VALUES(?, ?)", [name, password], (err, results)=>{
        if (err) {
            throw err
        } else {
            console.log("User added!");
        }
    })
}
/**
 * @param {string} name 
 * @param {string} type 
 * @param {boolean} income_type true - income, false - spending
 * @param {number} amount 
 * @param {sql.Connection} connection 
 */
function addTransaction(name, type, income_type, amount, connection) {
    connection.query(`INSERT INTO transactions(username, type, income, amount, date) VALUES(?, ?, ?, ?, ${getTodayDate()})`, [name, type, Number(income_type), amount, getTodayDate()], (err, results)=>{
        if (err) {
            throw err
        } else {
            console.log("Transaction added successfully!", getTodayDate())
        }
    })
}
/**
 * Checks if username exists in db and chechks if it matches the password. If string is empty then everything is OK :)
 * @param {string} name 
 * @param {string} password 
 * @param {sql.Connection} connection 
 * @returns {Promise}
 */
function userCheck(name, password, connection) {
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT 1 FROM users WHERE username = "${name}" AND password = "${password}"`, (err, results)=>{
            if (err) {
                throw err
            } else {
                if (results.length) {
                    resolve("")
                } else {
                    resolve("Имя или пароль неверны.")
                }
            }
        })
    })
}
/**
 * @returns {string} YYYY-MM-DD
 */
function getTodayDate() {
    let date = new Date()
    let year = date.getFullYear().toString(),
        month = date.getMonth().toString(),
        day = date.getDay().toString()
    if (month.length==1) {
        month="0"+month
    }
    if (day.length==1) {
        day="0"+day
    }
    return year+month+day
}
/**
 * @param {string} username 
 * @param {sql.Connection} connection 
 * @returns {Promise}
 */
async function getTransactionsByUsername(username, connection) {
    let sql = `SELECT * FROM transactions WHERE username="${username}"`
    return new Promise((resolve, reject)=>{
        connection.query(sql, (err, result)=>{
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    }) 
}

module.exports.addUser = addUser
module.exports.addTransaction = addTransaction
module.exports.getTransactionsByUsername = getTransactionsByUsername
module.exports.userCheck = userCheck