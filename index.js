const express = require('express')
const api = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const server = http.createServer(api)

api.use(cors())

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: '*'
    }
})

io.on('connection', (socket) => {
    console.log('User connected! ' + socket.id)

    socket.on('message', (message) => {
        socket.broadcast.emit('received', message)
        console.log(`${socket.id} sent: ${message}`)
    })
})

server.listen(3000, () => {
    console.log('Server running!')
})