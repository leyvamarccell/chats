import express from "express";
import morgan from "morgan";
import {Server as SocketServer} from 'socket.io'
import http from 'http'
import cors from 'cors'
import {PORT} from './config.js'

const app = express()

const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: 'http://127.0.0.1:5173',
    }
}
)


app.use(cors())
app.use(morgan("dev"))

io.on('connection', (socket) => {
    console.log(socket.id)
    console.log('a user connected')

socket.on('value', (value) => {
    console.log(value)
    socket.broadcast.emit('value', value )
    
})

})

server.listen(PORT)


console.log('Server runing on port 4000');