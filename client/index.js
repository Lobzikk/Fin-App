const express = require("express")
const http = require("http")
const app = express()

app.get("/login", (request, response)=>{
    response.sendFile(__dirname+"/login.html")
})

app.get("/", (request, response)=>{
    let data = ''
    http.get(`http://localhost:3000/login?name=${request.query.name}&password=${request.query.password}`, (resp)=>{
        resp.on('data', (chunk)=>{
            data += chunk
        })
        resp.on('end', ()=>{
            console.log(data)
        })
    })
    response.sendFile(__dirname+"/index.html") 
})

app.get("/signup", (request, response)=>{
    http.get(`http://localhost:3000/signup?name=${request.query.name}&password=${request.query.password}`)
    response.sendFile(__dirname+"/signuped.html")
})

app.listen(8080)