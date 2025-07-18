const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', socket => {
  console.log('Usuario conectado:', socket.id);

  socket.on('signal', data => {
    socket.broadcast.emit('signal', data);
  });

  socket.on('message', data => {
    socket.broadcast.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Servidor funcionando en puerto 3000');
});
