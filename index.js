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

var storeList = []

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

    socket.on('connect_store', store_name => {
        if (storeList.length > 0) {
            for(x=0; x<=storeList.length-1; x++) {
                if (storeList[x] == store_name) {
                    break
                } 
            }
            console.print('adding store: ' + store_name)
            storeList.log(store_name)
        } else {
            console.log('adding store: ' + store_name)
            storeList.push(store_name)
        }
    });

    socket.on('disconnect_store', store_name => {
        for(x=0; x<=storeList.length-1; x++) {
            if (storeList[x] == store_name) {
                console.log('removing store: ' + store_name)
                storeList.splice(x, 1)
            }
        }
    });

    socket.on('place_order', (paylaod) => { 

        // TODO: store on server

        console.log('payload to send ' + paylaod)
        io.emit('prepare_order', paylaod);
    });

})

server.listen(3000, () => {
    console.log('listening on *:3000')
})