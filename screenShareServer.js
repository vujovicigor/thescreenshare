var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8764);
console.log('listening at 8764')

// Serve static
app.use(express.static('static/public'))

// P2P signaling server
io.on('connection', function (socket) {
  socket.on('signal', function (d) {// data,to
    console.log('signal reemiting', d, 'sender:', socket.id);
    io.in(d.to).emit('signal', { data:d.data, from:socket.id })
  });

  socket.on('initP2PWith', function (broadcasterSockId) {
    console.log('initP2PWith, broadcasterSockId:', broadcasterSockId, 'sender:',socket.id);
    io.in(broadcasterSockId).emit('initP2PWith', socket.id)
  });
})