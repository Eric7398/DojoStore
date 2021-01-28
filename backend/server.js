import express from 'express';
import cors from 'cors';
import { Server as socketIOServer } from 'socket.io'
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import router from './routes/socketRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import { addUser, removeUser, getUser, getUsersInRoom } from './data/socketUsers.js'

dotenv.config()
connectDB()

// Server & Socket Functions
const app = express();

// Using Cors for socketio
app.use(cors())

// Testing API at Root
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is Running...')
})


// Product % Socket Routes
app.use(router)
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)



// Errors
// For all Errors that are 404 not found errors
app.use(notFound)
// To make sure the errors will always show as a JSON message not HTML
app.use(errorHandler)


// Fire server
const PORT = process.env.PORT || 5000
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

const io = new socketIOServer(server, { cors: true });

// Socket Connection
io.on('connection', (socket) => {
    console.log('We have a new conneciton!!!');

    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room)
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error)

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!` })
        socket.join(user.room);
    });

    socket.on('disconnect', () => {
        console.log('User had left!!!');
    });
})
