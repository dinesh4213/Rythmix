const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { getToken } = require('../utils/helper');
// const { promisify } = require("util");

// This POST route will help to register a user
router.post("/register", async (req, res) => {
	// This code is run whn the register api is called as a POST request
	//  my req.body will be of the format {email, password,fn,ln,username};

	const { email, password, firstName, lastName, username } = req.body;

	let user = await User.findOne({ email: email });
	if (user) {
		return res
			.status(403)
			.json({ error: "A user with this email already exists" });
	}

	// Creating a new user 
	// password converted to hash
	// const hashedPassword = bcrypt.hash(password, '10');

	user = new User({
		email,
		password,
		firstName,
		lastName,
		username
	});

	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(password, salt);

	// Creating the toekn to return to user
	const token = getToken(email, user);

	const userToReturn = { ...user.toJSON(), token };
	delete userToReturn.password;
	await user.save();
	return res.status(200).json(userToReturn);
});


router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });

		if (!user) {
			return res.status(403).json({ err: "Invalid Credentials 1" });
		}
		const hash = user.password;
		await bcrypt.compare(password, hash, function (err, result) {
			if (err) {
				console.error(err.message);
				res.status(401).send("Internal Error");
			}
			console.log(result);
			if (result) {
				const token = getToken(email, user);

				const userToReturn = { ...user.toJSON(), token };
				delete userToReturn.password;

				return res.status(200).json(userToReturn);
			}
			else {
				return res.status(403).json({ err: "Invalid Credentials 2" });
			}
		});
	}
	catch (err) {
		console.error(err.message);
		res.status(401).send("Server Error");
	}
});



module.exports = router;