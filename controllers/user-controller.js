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
	// console.log(hash);
	let username = req.body.username;
	let password = req.body.password;

	// SEARCH THROUGH USERNAME AND MAKE SURE IT IS UNIQUE
	db.user.findOne({ where: { username: username } }).then(results => {
		if (!results) {
			// IF NO RESULTS THEN SEND SAVE
			try {
				hash = bcrypt.hashSync(password, 10);
				console.log(hash);

				db.user.create({
					username: username,
					password: hash
				}).then((results) => {
					// console.log(results)
					let id = results.id
					return res.json({ mysqlID: id });
				})

			} catch (err) {
				console.log(err);
				return res.status(400).send(err);
			}
		} else {
			res.json({ mysqlID: "none" })
		}
	})
});

/* Login Route
========================================================= */
router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	let hash;
	hash = bcrypt.hashSync(password, 10);
	// if the username / password is missing, we use status code 400
	// indicating a bad request was made and send back a message
	if (!username || !password) {
		return res.status(400).send("Request missing username or password param");
	}

	// try {
	// 	let user = await db.user.authenticate(username, hash);

	// 	// user = await user.authorize();
	// 	console.log(user);
	// 	return res.json({user});

	// } catch (err) {
	// 	return res.status(400).send("invalid username or password");
	// }

	db.user.findOne({ where: { username: username } }).then(results => {

		hash = bcrypt.hashSync(password, 10);
		// console.log(hash);
		let enteredPass = results.password

		if (hash === enteredPass) {

			res.json({ mysqlID: results.id })

		} else {
			res.json({ mysqlID: "none" })
		}

	}).catch(err => {
		console.log(err);
		return res.status(400).send(err);
	})
});

/* Login Route
========================================================= */
router.put("/form", async (req, res) => {
	// SAVE SQL INFORMATION (FIRST NAME, LAST NAME, EMAIL, PHONE NUMBER)
	let firstname = req.body.firstname;
	let lastname = req.body.lastname;
	let email = req.body.email;
	let phonenumber = req.body.phonenumber;

	db.user.update({
		firstname: firstname,
		lastname: lastname,
		email: email,
		phonenumber: phonenumber,
	},
		{ where: req.body.mysqlID })
		.then((results) => {
			// console.log(results)
			return res.json({ mysqlID: results.id });
		})
		.catch (err => console.error(err))

});

// /* Logout Route
// ========================================================= */
// router.delete("/logout", async (req, res) => {
// 	// because the logout request needs to be send with
// 	// authorization we should have access to the user
// 	// on the req object, so we will try to find it and
// 	// call the model method logout
// 	const {
// 		user,
// 		cookies: { auth_token: authToken }
// 	} = req;

// 	// we only want to attempt a logout if the user is
// 	// present in the req object, meaning it already
// 	// passed the authentication middleware. There is no reason
// 	// the authToken should be missing at this point, check anyway
// 	if (user && authToken) {
// 		await req.user.logout(authToken);
// 		return res.status(204).send();
// 	}

// 	// if the user missing, the user is not logged in, hence we
// 	// use status code 400 indicating a bad request was made
// 	// and send back a message
// 	return res.status(400).send({ errors: [{ message: "not authenticated" }] });
// });

// /* Me Route - get the currently logged in user
// ========================================================= */
// router.get("/me", (req, res) => {
// 	if (req.user) {
// 		return res.send(req.user);
// 	}
// 	res.status(404).send({ errors: [{ message: "missing auth token" }] });
// });

// export the router so we can pass the routes to our server
module.exports = router;
