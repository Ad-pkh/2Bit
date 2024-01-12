const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const messages = [];
const users = [];

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', (username) => {
    users.push({ id: socket.id, username });
    io.emit('user-list', users.map(user => user.username));
  });

  socket.emit('chat-history', messages);

  socket.on('chat-message', (data) => {
    const { sender, message } = data;
    const newMessage = { sender, message };
    messages.push(newMessage);
    io.emit('chat-message', newMessage);
  });

  socket.on('disconnect', () => {
    const disconnectedUser = users.find(user => user.id === socket.id);
    if (disconnectedUser) {
      users.splice(users.indexOf(disconnectedUser), 1);
      io.emit('user-list', users.map(user => user.username));
    }

    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

