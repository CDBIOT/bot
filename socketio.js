
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const socketIO = require('socket.io');

const port = process.env.PORT || 3000 || 8000;
const io = socketIO(server);

app.get('/', (req, res) => {
    res.sendFile('socketio.html', {
      root: __dirname
    });
  });
  
  
io.on('connection', (socket) => {
    console.log('a user connected');
  });

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
//   });

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
  });


  // this will emit the event to all connected sockets
io.emit('hello', 'world'); 

io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
  });

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

server.listen(port, () => {
    console.log('server running at port: '+ port );
  });
    