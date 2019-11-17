const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();

const connection = mysql.createConnection({
	host: "us-cdbr-iron-east-05.cleardb.net",
	user: "b0de8c1f92993e",
	password: "9187b512",
	database: "heroku_59a75cdbee2442a"
});

connection.connect(err => {
	if (err) {
		return err;
	}
});

app.post("/afterlogin", (req, res) => {
	// Connecting to the database.
	connection.query(
		"INSERT INTO users SET ?",
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
			res.send({ mysqlID: id });
		}
	);
});

// NEED TO PASS ISABEL OBJECT (mysql ID)

// Starting our server.
app.listen(3306, () => {
	console.log(
		"Go to http://localhost:3306/afterlogin so you can see the data."
	);
});
