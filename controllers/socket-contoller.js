const express = require('express');
const app = express();
var PORT = process.env.PORT || 4000;
const http = require("http");
const server = http.Server(app);
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

server.listen(PORT, err => {
	if (err) {
		console.log(`Error starting server: ${err}`);
		process.exit(1);
	}
	console.log("listening on *:3000");
});

    module.exports = {
        nsp: io.of('/socket/talk')
    }

