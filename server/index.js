const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require("socket.io");

const PORT = 3001;

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('user connected: ' + socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected: ', socket.id);
    });
});


server.listen(PORT, () => {
    console.log('listening on ' + PORT);
    }
);