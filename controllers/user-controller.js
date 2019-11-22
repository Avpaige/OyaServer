const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../models");

/* Register Route
========================================================= */
router.post("/register", async (req, res) => {
	// hash the password provided by the user with bcrypt so that
	// const hash = bcrypt.hashSync(req.body.password, 10);
	let hash;
	let username = req.body.username;
	let password = req.body.password;

	// SEARCH THROUGH USERNAME AND MAKE SURE IT IS UNIQUE
	db.users.findAll({ where: {username: username} }).then(results => {
		// console.log(results)
		// res.send({result: results.length})
		if (results.length === 0) {
			// IF NO RESULTS THEN SEND SAVE
			try {
				hash = bcrypt.hashSync(password, 10);
				console.log(hash);

				db.users
					.create({
						username: username,
						password: hash
					})
					.then(results => {
						// console.log(results)
						// res.send(results)
						let id = results.id;
						return res.json({ mysqlID: id });
					});
			} catch (err) {
				console.log(err);
				return res.status(400).send(err);
			}
			
		} else {
			// res.send({ results: results });
			res.json({ mysqlID: "none" });
			
		}
	});
});

/* Login Route
========================================================= */
router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	
	// if the username / password is missing, we use status code 400
	// indicating a bad request was made and send back a message
	if (!username || !password) {
		return res.status(400).send("Request missing username or password param");
	}
	db.users
		.findOne({ where: { username: username } })
		.then(results => {
			// res.json(results)
			// console.log(hash);
			let enteredPass = results.password;

			bcrypt.compare(password, enteredPass, function (err, confirm) {
				if (confirm) {
					res.json({ 
						mysqlID: results.id,
						firstname: results.firstname,
						lastname: results.lastname
					 });
				} else {
					res.json({ mysqlID: "none" });
				}
			})
		})
		.catch(err => {
			console.log(err);
			return res.status(400).send(err);
		});
});

/* Login Route
========================================================= */
router.put("/form", async (req, res) => {
	// SAVE SQL INFORMATION (FIRST NAME, LAST NAME, EMAIL, PHONE NUMBER)
	let firstname = req.body.firstname;
	let lastname = req.body.lastname;
	let email = req.body.email;
	let phonenumber = req.body.phonenumber;
	console.log(phonenumber);
	db.users
		.update(
			{
				firstname: firstname,
				lastname: lastname,
				email: email,
				phonenumber: phonenumber
			},
			{ where: { id: req.body.mysqlID } }
		)
		.then(results => {
			// console.log(results)
			return res.json({ mysqlID: results.id });
		})
		.catch(err => console.error(err));
});

module.exports = router;
