// const { Socket } = require('dgram')
// const express = require('express')
// const app = express()
// const http = require('http')
// const path = require('path')
// const server = http.createServer(app)
// const { Server } = require("socket.io")
// const io = new Server(server)

const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    path: '/socket.io'
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/chatForm.html')
})

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
})

server.listen(3000, () => {
    console.log('listening on *:3000')
})