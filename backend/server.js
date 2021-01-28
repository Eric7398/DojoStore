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

    // JOIN A ROOM.
    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room)
        // ADD USER TO LIST OF USERS. ERRORS ? ERRORS : ADD
        const { error, user } = addUser({ id: socket.id, name, room });
        if (error) return callback(error)

        // ADMIN IS MADE AWARE OF THE ADDITIONAL USER
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` })
        // EVERYBODY ELSE IN ROOM IS MADE AWARE OF ADDITIONAL USER
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!` })

        // NEW USER'S SOCKET IS ADDED TO THE SPECIFIED ROOM
        socket.join(user.room);

        callback();
    });

    // SEND MESSAGE FROM USER TO EVERYBODY ELSE IN
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });
        callback();
    })

    socket.on('disconnect', () => {
        console.log('User had left!!!');
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left` })
        }
    });
})
