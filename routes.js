const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();

const connection = mysql.createConnection({
	host: "us-cdbr-iron-east-05.cleardb.net",
	user: "b60814e88265c9",
	password: "961d279b",
	database: "heroku_af0100799ed6eb1"
});

connection.connect(err => {
	if (err) {
		return err;
	}
});

app.post("/afterlogin", (req, res) => {
	// Connecting to the database.
	connection.query(
		"INSERT INTO userInfo SET ?",
		{
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			phonenumber: req.body.phonenumber
		},
		function(error, results) {
			// If some error occurs, we throw an error.
			if (error) throw error;

			// Getting the 'response' from the database and sending it to our route. This is were the data is.
			res.send(results);
		}
	);
});

// NEED TO PASS ISABEL OBJECT (mysql ID)

// Starting our server.
app.listen(3306, () => {
	console.log("Go to http://localhost:3306/users so you can see the data.");
});
