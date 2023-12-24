const express = require("express")
const { userCheck, addUser, getTransactionsByUsername, addTransaction } = require("./database.js")
const sql = require("mysql2")

require("dotenv").config()

const clients = new Map(), //IP-Username
app = express(),
connection = sql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
})

app.get("/login", (request, response)=>{
    const name = request.query.name,
    password = request.query.password
    let promise = userCheck(name, password, connection)
    promise.then((result) => {
        if (!result) { //!"", if everything went ok
            clients[request.socket.remoteAddress]=name
            console.log(clients)
            response.send("1|Вы успешно залогинились!")
        } else {
            console.log(request.query)
            response.send("0|Неверная комбинация логина и пароля.")
        }
    })
})

const cors = require("cors")
app.use(cors())

app.get("/signup", (request, response)=>{
    const name = request.query.name,
    password = request.query.password
    addUser(name, password, connection)
    response.send("Вы успешно зарегестрированы")
    clients[request.socket.remoteAddress]=name
})

app.get("/transactions", (request, response)=>{
    if (clients[request.socket.remoteAddress]) {
        let name = clients[request.socket.remoteAddress],
        promise = getTransactionsByUsername(name, connection) 
        promise.then((result)=>{
            response.send(JSON.stringify(result))
        })
    } else {
        console.log(request.socket.remoteAddress, clients)
        response.sendStatus(401)
    }
})

app.get("/addtransaction", (request, response)=>{
    if (clients[request.socket.remoteAddress]) {
        let name = clients[request.socket.remoteAddress],
        type = request.type,
        income = Boolean(request.income)
        amount = request.amount
        addTransaction(name, type, income, amount, date)
        response.send("Данные успешно добавлены")
    } else {
        response.sendStatus(401)
    }
})

app.listen(3000)