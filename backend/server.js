const express = require('express');
const http = require('http')
const socketio = require('socket.io');
const mongojs = require('mongojs');
const cors = require('cors')
const sequelize = require("sequelize");
const ObjectID = mongojs.ObjectID;
const mDB = mongojs(process.env.MONGO_URL || 'mongodb://localhost:27017/chats');
const app = express();
const server = http.Server(app);
const websocket = socketio(server);
require("dotenv").config();
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const customAuthMiddleware = require("./middelware/custom-auth-middleware");
const userController = require("./controllers/user-controller");
const viewsController = require("./controllers/views-controller");
var fs = require('fs');
// directory references
const clientDir = path.join(__dirname, "../client");
// set up the Express App
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require("../models/index");

app.use(cors())

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3333, (err) => {
    if (err) {
        console.log(`Error starting server: ${err}`)
        process.exit(1)
    }
    console.log('listening on *:3000')
});

// Mapping objects to easily map sockets and users.
var clients = {};
var users = {};

// This represents a unique chatroom.
// For this example purpose, there is only one chatroom;
var chatId = 1;

websocket.on('connection', (socket) => {
    console.log("here")
    clients[socket.id] = socket;
    socket.on('userJoined', (userId) => onUserJoined(userId, socket));
    socket.on('message', (message) => onMessageReceived(message, socket));

    socket.emit('news', { coding: "is fun"});
    socket.on("my other event", (data) => {
        console.log("Received event data");
        console.log(data);
    })
        
});


// Event listeners.
// When a user joins the chatroom.
function onUserJoined(userId, socket) {
  try {
    // The userId is null for new users.
    if (!userId) {
      var user = mDB.collection('users').insert({}, (err, user) => {
        socket.emit('userJoined', user._id);
        users[socket.id] = user._id;
        _sendExistingMessages(socket);
      });
    } else {
      users[socket.id] = userId;
      _sendExistingMessages(socket);
    }
  } catch(err) {
    console.err(err);
  }
}

// When a user sends a message in the chatroom.
function onMessageReceived(message, senderSocket) {
  var userId = users[senderSocket.id];
  // Safety check.
  if (!userId) return;

  _sendAndSaveMessage(message, senderSocket);
}

// Helper functions.
// Send the pre-existing messages to the user that just joined.
function _sendExistingMessages(socket) {
  var messages = mDB.collection('messages')
    .find({ chatId })
    .sort({ createdAt: 1 })
    .toArray((err, messages) => {
      // If there aren't any messages, then return.
      if (!messages.length) return;
      socket.emit('message', messages.reverse());
  });
}

// Save the message to the db and send all sockets but the sender.
function _sendAndSaveMessage(message, socket, fromServer) {
  var messageData = {
    text: message.text,
    user: message.user,
    createdAt: new Date(message.createdAt),
    chatId: chatId
  };

  mDB.collection('messages').insert(messageData, (err, message) => {
    // If the message is from the server, then send to everyone.
    var emitter = fromServer ? websocket : socket.broadcast;
    emitter.emit('message', [message]);
  });
}

// Allow the server to participate in the chatroom through stdin.
var stdin = process.openStdin();
stdin.addListener('data', function(d) {
  _sendAndSaveMessage({
    text: d.toString().trim(),
    createdAt: new Date(),
    user: { _id: 'robot' }
  }, null /* no socket */, true /* send from server */);
});

//START OF CHANEL'S CODE (minus dependencies which were moved to the top)
//--------------------------------------------------------


// controller imports


// Express middleware that allows POSTing data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use the cookie-parser to help with auth token,
// it must come before the customAuthMiddleware
app.use(cookieParser());
app.use(customAuthMiddleware);

// serve up the public folder so we can request static
// assets from the client
app.use("/assets", express.static(clientDir));

// hook up our controllers
app.use(userController);
app.use(viewsController);


db.sequelize.sync({ force: true }).then(() => {
	// inside our db sync callback, we start the server
	// this is our way of making sure the server is not listening
	// to requests if we have not made a db connection
	app.listen(PORT, () => {
		console.log(`App listening on PORT ${PORT}`);
	});
});
