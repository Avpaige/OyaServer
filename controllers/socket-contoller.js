

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
        const socket=socket;
        console.log(socket.id)
  },
}
