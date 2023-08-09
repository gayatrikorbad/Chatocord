const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Run when client conects
io.on('conection', socket => {
  console.log('New WS Connection...');

  //Welcome current user
  socket.emit('message', 'Welcome to Chatcord!');

  //Broadcast when a user connects
  socket.broadcast.emit('message', 'A user has joined the chat');

  //Runs when client discoonects
  socket.on("disconnect", () => {
      io.emit('A user has left the chat');
  }); 

  //Listen for chatMessage
  socket.on('chatMessage', msg => {
    io.emit('message',msg);
  });
});

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
