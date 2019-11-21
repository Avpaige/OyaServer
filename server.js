require("dotenv").config({ silent: process.env.NODE_ENV === "production" });
//ALL DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const app = express();
const server = http.Server(app);
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const customAuthMiddleware = require("./middelware/custom-auth-middleware");
const userController = require("./controllers/user-controller");
const mongoRoutes = require("./mongo_routes");
// directory references
const clientDir = path.join(__dirname, "../client");
// set up the Express App
const PORT = process.env.PORT || 8000;
// Requiring our models for syncing
const db = require("./models");

app.use(cors());

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});


// also udpated force to FALSE so that it wont delete all users everytime the server starts
db.sequelize.sync({ force: false }).then(() => {
	// inside our db sync callback, we start the server
	// this is our way of making sure the server is not listening
	// to requests if we have not made a db connection
});

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

// hook up our controllers (MYSQL)
app.use(userController);
// MONGO ROUTED CONNECTION
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
app.use(mongoRoutes);

// Start the API server
app.listen(PORT, function(res, err) {
	console.log(`🌎  ==> OYA Server now listening on PORT ${PORT}!`);

	if (err) {
		console.err("there is an ERROR", err)
	}
  });

