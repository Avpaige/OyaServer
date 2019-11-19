const express = require('express');
const app = express();
const server = http.Server(app);
var port = process.env.PORT || 4000;
const io = require('socket.io')(server);
const nsp = io.of('/socket/talk');

var sockets = {};

nsp.on('connection', function (socket) {
    console.log('connection');

    socket.on('add user', function (senderId) {
        console.log('add user', senderId);
        socket.sid = senderId;
        sockets[socket.sid] = socket;
    });

    socket.on('new message', function (data) {
        console.log('new message', data);
  
        {       sockets[data.recipientId].emit('new message', {
                senderId: data.senderId,
                recipientId: data.recipientId,
                message: data.message
            });
        }

    socket.on('disconnect', function () {
            console.log(socket.sid, 'disconnected');
            delete sockets[socket.sid];
        });
    });
});

    module.exports = {
        nsp: io.of('/socket/talk')
    }

