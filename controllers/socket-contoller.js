const express = require('express');
const app = express();
var PORT = process.env.PORT || 4000;
const http = require("http");
const server = http.Server(app);
const io = require('socket.io')(server);
const nsp = io.of('socket/talk/:socket');
var sockets = {};

nsp.on('connection', function (socket) {
    console.log('connection');

    socket.on('connection', function(socket){
        socket.on('chat message', function(msg){
          io.emit('chat message', msg);
        });
      });


      socket.on('connection', function(socket){
        socket.leave('some room');
      });
    });



module.exports = {
    nsp: io.of('/socket/talk')
}

