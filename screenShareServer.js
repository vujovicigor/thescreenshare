var express = require('express');
var {last} = require('./names.js')
const jsonfile = require('jsonfile')
const db_file = './data.json'
let db_obj = jsonfile.readFileSync(db_file)
db_obj.ix++
console.log(db_obj.ix)

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8764);
console.log('listening at 8764')

// Serve static
app.use(express.static('static/public'))

// P2P signaling server
io.on('connection', function (socket) {

  socket.on('auth', function (name, ack) {
    console.log('auth received', name);
    let sock_name = name?name:last[db_obj.ix++].toLowerCase()
    console.log('ix=', db_obj.ix)
    socket.sock_name = sock_name
    socket.join(sock_name)
    if (ack) ack(sock_name)
  });
  
  socket.on('signal', function (d) {// data,to
//    console.log('signal reemiting', d, 'sender:', socket.id);
    console.log('signal reemiting', d, 'sender:', socket.sock_name);
    //io.in(d.to).emit('signal', { data:d.data, from:socket.id })
    io.in(d.to).emit('signal', { data:d.data, from:socket.sock_name })
  });

  socket.on('initP2PWith', function (broadcasterSockId) {
//    console.log('initP2PWith, broadcasterSockId:', broadcasterSockId, 'sender:',socket.id);
    console.log('initP2PWith, broadcasterSockId:', broadcasterSockId, 'sender:',socket.sock_name);
//    io.in(broadcasterSockId).emit('initP2PWith', socket.id)
    io.in(broadcasterSockId).emit('initP2PWith', socket.sock_name)
  });
})


// not important stuff below


function exitHandler(options, exitCode) {
  console.log('save ix to file', db_obj.ix)
  jsonfile.writeFileSync(db_file,db_obj)
  if (options.cleanup) console.log('clean');
  if (exitCode || exitCode === 0) console.log(exitCode);
  if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
