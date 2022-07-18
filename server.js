const express = require("express");
const http = require("http");

const app = express();
const httpServer = http.createServer(app)

const ws = require("ws");
const wss = new ws.Server({server: httpServer});

app.get("/", (req,res)=>{
    res.sendFile(`${__dirname}/index.html`)
})

wss.on("connection", (socket)=>{
    console.log("Client connected");
    socket.on("message", (data)=>{
        const msg = data.toString();
        wss.clients.forEach(client => {
            if(client !== socket){
                client.send(msg)
            }
           
        })
    });
    socket.on("close", ()=>{
        console.log("User disconnected");
    })
});

httpServer.listen(process.env.PORT || 3030, ()=>{
    console.log("Server is running @3030");
})