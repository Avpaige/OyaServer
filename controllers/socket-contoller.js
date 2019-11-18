const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const socketConnect = io.of('/socket/talk');

socketConnect.on('connection', function(socket){
  console.log('someone connected');
});
socketConnect.emit('hi', 'everyone!');


// // Save the message to the db and send all sockets but the sender.
// function _sendAndSaveMessage(message, socket, fromServer) {
// 	var messageData = {
// 		text: message.text,
// 		user: message.user,
// 		createdAt: new Date(message.createdAt),
// 		chatId: chatId
// 	};

// 	mDB.collection("messages").insert(messageData, (err, message) => {
// 		// If the message is from the server, then send to everyone.
// 		var emitter = fromServer ? websocket : socket.broadcast;
// 		emitter.emit("message", [message]);
// 	});
// }

module.exports = {

    // (GET) - VOLUNTEER/USER (STATIC) - get socket number
    getStaticSocket: function (req, res) {
      // code for static socket goes here

  },
}
