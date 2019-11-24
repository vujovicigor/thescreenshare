var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8764);
console.log('listening at 8764')
app.use(express.static('static'))

//var sifarnik = {}; // key:[val]
//var sken = [] // array of strings, ne -- od arraya
io.on('connection', function (socket) {
//  socket.emit('sifarnik', sifarnik );
/*
  socket.on('sifarnik', function (data, cb) {
    console.log('stigao sifarnik');
    sifarnik = data;
    if (cb) cb()
    io.emit('sifarnik', sifarnik );
  });
*/
  socket.on('signal', function (d) {// data,to
    console.log('signal reemiting', d, 'sender:', socket.id);
    io.in(d.to).emit('signal', { data:d.data, from:socket.id })
  });

  socket.on('initP2PWith', function (broadcasterSockId) {
    console.log('initP2PWith, broadcasterSockId:', broadcasterSockId, 'sender:',socket.id);
    io.in(broadcasterSockId).emit('initP2PWith', socket.id)
  });
})